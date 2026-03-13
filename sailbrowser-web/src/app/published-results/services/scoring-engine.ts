import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { doc, getDocs, getFirestore, query, runTransaction, Transaction, where } from '@angular/fire/firestore';
import { ClubStore, FirestoreTenantService } from 'app/club-tenant/index';
import { Race, RaceCalendarStore, Series } from 'app/race-calender';
import { CurrentRaces, RaceCompetitorStore, SeriesEntryStore } from 'app/results-input';
import { score } from 'app/scoring';
import { PublishedRace } from '../model/published-race';
import { PublishedSeason, SeriesInfo } from '../model/published-season';
import { PublishedSeries } from '../model/published-series';
import { PUBLISHED_RACES_PATH, PUBLISHED_SEASONS_PATH, PUBLISHED_SERIES_PATH } from './published-results-store';

@Injectable({ providedIn: 'root' })
export class ScoringEngine {
   private readonly firestore = getFirestore(inject(FirebaseApp));
   private cs = inject(ClubStore);
   private rcs = inject(RaceCompetitorStore);
   private currentRaces = inject(CurrentRaces);
   private calander = inject(RaceCalendarStore);
   private tenant = inject(FirestoreTenantService);
   private seriesEntryStore = inject(SeriesEntryStore);

   private seasonsCollection = this.tenant.collectionRef<PublishedSeason>(PUBLISHED_SEASONS_PATH);
   private seriesCollection = this.tenant.collectionRef<PublishedSeries>(PUBLISHED_SERIES_PATH);
   private racesCollection = this.tenant.collectionRef<PublishedRace>(PUBLISHED_RACES_PATH);

   /** Publishes the results of a race */
   async publishRace(race: Race): Promise<void> {
      const series = this.currentRaces.selectedSeries().find(s => s.id === race.seriesId)!;
      const competitors = this.rcs.selectedCompetitors().filter(c => c.raceId === race.id);
      const seriesEntries = this.seriesEntryStore.selectedEntries().filter( s => s.seriesId === race.seriesId)

      // 1. Fetch all existing data required for scoring.
      const existingRaces = await this.readPublishedRaces(series);
      const raceCount = existingRaces.filter(r => r.id !== race.id).length + 1;

      // 2. Call the pure scoring orchestrator to perform all calculations.
      const { scoredRaces, seriesResults } = score(series, race, competitors, existingRaces, seriesEntries, {
         seriesType: series.scoringScheme.scheme,
         discards: this.calculateDiscards(series, raceCount),
      });

      // 3. Prepare the final series object for persistence.
      const scoredSeries: PublishedSeries = {
         id: race.seriesId,
         name: race.seriesName,
         fleetId: race.fleetId,
         competitors: seriesResults
      };

      await runTransaction(this.firestore, async (transaction) => {

         // Update published season  
         var { seasonData, seasonDocRef } = await this.readOrCreatePublishedSeason(series, transaction);
         this.updatePublishedSeason(series, scoredRaces, seasonData);
         transaction.set(seasonDocRef, seasonData);

         // Update published races
         for (const r of scoredRaces) {
            const raceRef = doc(this.racesCollection, r.id);
            transaction.set(raceRef, r);
         }

         // Save the published series. 
         const seriesResultsDocRef = doc(this.seriesCollection, series.id);
         transaction.set(seriesResultsDocRef, scoredSeries);

      });

      // Update the race to clear the dirtyn flag and set its status to published
      this.calander.updateRace(race.id, { status: 'Published', dirty: false});
   }

   private updatePublishedSeason(series: Series, scoredRaces: PublishedRace[], seasonData: PublishedSeason) {
      const seriesSummary: SeriesInfo = {
         id: series.id,
         name: series.name,
         fleetId: series.fleetId,
         raceCount: scoredRaces.length,
         startDate: scoredRaces[0].scheduledStart,
         endDate: scoredRaces[scoredRaces.length - 1].scheduledStart,
      };

      const seriesIndex = seasonData.series.findIndex(s => s.id === series.id);
      if (seriesIndex > -1) {
         seasonData.series[seriesIndex] = seriesSummary;
      } else {
         seasonData.series.push(seriesSummary);
      }
   }

   /** If published season exist use it, otherwise create a new one. */
   private async readOrCreatePublishedSeason(series: Series, transaction: Transaction) {
      const seasonDocRef = doc(this.seasonsCollection, series.seasonId);
      const seasonDoc = await transaction.get(seasonDocRef);

      let seasonData;
      if (seasonDoc.exists()) {
         seasonData = seasonDoc.data();
      } else {
         const s = this.cs.findSeason(series.seasonId)()!;
         seasonData = {
            id: s.id,
            name: s.name,
            series: [],
         };
      }
      return { seasonData, seasonDocRef };
   }

   private async readPublishedRaces(series: Series) {
      const q = query(this.racesCollection, where('seriesId', '==', series.id));
      const existingRacesSnapshot = await getDocs(q);
      const existingRaces = existingRacesSnapshot.docs.map(d => d.data()).sort((a, b) => a.index - b.index);
      return existingRaces;
   }

   private calculateDiscards(series: Series, raceCount: number): number {
      const { initialDiscardAfter, subsequentDiscardsEveryN } = series.scoringScheme;

      if (raceCount < initialDiscardAfter) {
         return 0;
      }

      let discards = 1;
      const racesAfterInitial = raceCount - initialDiscardAfter;

      if (racesAfterInitial > 0 && subsequentDiscardsEveryN > 0) {
         discards += Math.floor(racesAfterInitial / subsequentDiscardsEveryN);
      }

      return discards;
   }
}