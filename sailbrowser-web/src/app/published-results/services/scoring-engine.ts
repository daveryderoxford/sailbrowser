import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { collection, doc, getDocs, getFirestore, query, runTransaction, Transaction, updateDoc, where } from '@angular/fire/firestore';
import { PublishedRace } from '../model/published-race';
import { PublishedSeason, SeriesInfo } from '../model/published-season';
import { PublishedSeries } from '../model/published-series';
import { score } from 'app/scoring';
import { CurrentRaces, RaceCompetitorStore } from 'app/results-input';
import { dataObjectConverter } from 'app/shared/firebase/firestore-helper';
import { Race, RaceCalendarStore, Series } from 'app/race-calender';
import { PUBLISHED_RACES_PATH, PUBLISHED_SEASONS_PATH, PUBLISHED_SERIES_PATH } from './published-results-store';
import { ClubService } from 'app/club';

@Injectable({ providedIn: 'root' })
export class ScoringEngine {
   private readonly firestore = getFirestore(inject(FirebaseApp));
   private cs = inject(ClubService);
   private rcs = inject(RaceCompetitorStore);
   private currentRaces = inject(CurrentRaces);
   private calander = inject(RaceCalendarStore);

   private seasonsCollection = collection(
      this.firestore, PUBLISHED_SEASONS_PATH).withConverter(dataObjectConverter<PublishedSeason>());

   private seriesResultsCollection = collection(
      this.firestore, PUBLISHED_SERIES_PATH).withConverter(dataObjectConverter<PublishedSeries>());

   private racesCollection = collection(
      this.firestore, PUBLISHED_RACES_PATH).withConverter(dataObjectConverter<PublishedRace>());

   /** Publishes the results of a race */
   async publishRace(race: Race): Promise<void> {
      const series = this.currentRaces.selectedSeries().find(s => s.id === race.seriesId)!;
      const competitors = this.rcs.selectedCompetitors().filter(c => c.raceId === race.id);

      // Get all previously published races for this series
      const existingRaces = await this.readPublishedRaces(series);

      const raceCount = existingRaces.filter(r => r.id !== race.id).length + 1;

      // Score the race and update any published results if they are impacted. 
      const { scoredRaces, seriesResults } = score(series, race, competitors, existingRaces, {
         seriesType: series.scoringScheme.scheme,
         discards: this.calculateDiscards(series, raceCount),
      });

      const scoredSeries: PublishedSeries = {
         id: race.seriesId,
         name: race.seriesName,
         fleetId: race.fleetId,
         competitors: seriesResults
      };

      await runTransaction(this.firestore, async (transaction) => {

         // Update published races
         // were altered by a change in the number of series competitors (for DNC scores) are updated.
         for (const r of scoredRaces) {
            const raceRef = doc(this.racesCollection, r.id);
            transaction.set(raceRef, r);
         }

         // Save the published series. 
         const seriesResultsDocRef = doc(this.seriesResultsCollection, series.id);
         transaction.set(seriesResultsDocRef, scoredSeries);

         // Update published season  
         var { seasonData, seasonDocRef } = await this.readOrCreatePublishedSeason(series, transaction);
         this.updatePublishedSeason(series, scoredRaces, seasonData);
         transaction.set(seasonDocRef, seasonData);

      });

      // 8. Update the status race to published
      this.calander.updateRace(series.id, race.id, { status: 'Published' });
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

   private async readOrCreatePublishedSeason(series: Series, transaction: Transaction) {
      const seasonDocRef = doc(this.seasonsCollection, series.seasonId);
      const seasonDoc = await transaction.get(seasonDocRef);

      let seasonData;
      if (seasonDoc.exists()) {
         seasonData = seasonDoc.data();
      } else {
         const s = this.cs.findSeason(series.id)()!;
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
      const existingRaces = existingRacesSnapshot.docs.map(d => d.data());
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