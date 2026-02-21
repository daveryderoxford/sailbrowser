import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { collection, doc, getDocs, getFirestore, query, runTransaction, updateDoc, where } from '@angular/fire/firestore';

import { PublishedRace } from '../model/published-race';
import { PublishedSeason, SeriesInfo } from '../model/published-season';
import { PublishedSeriesResult } from '../model/published-series';
import { score } from 'app/scoring';
import { CurrentRaces, RaceCompetitorStore } from 'app/results-input';
import { dataObjectConverter } from 'app/shared/firebase/firestore-helper';
import { Race, Series } from 'app/race-calender';

@Injectable({providedIn: 'root'})
export class ScoringEngine {
   private readonly firestore = getFirestore(inject(FirebaseApp));
   private rcs = inject(RaceCompetitorStore);
   private currentRaces = inject(CurrentRaces);

   private seasonsCollection = collection(
      this.firestore, '/published-seasons').withConverter(dataObjectConverter<PublishedSeason>());

   private racesCollection = collection(
      this.firestore, '/published-races').withConverter(dataObjectConverter<PublishedRace>());

   private seriesResultsCollection = collection(
      this.firestore, '/published-series-results').withConverter(dataObjectConverter<PublishedSeriesResult[]>());

   /** Publishes the results of a race */
   async publishRace(race: Race) {
      const series = this.currentRaces.selectedSeries().find(s => s.id === race.seriesId)!;
      const competitors = this.rcs.selectedCompetitors().filter(c => c.raceId === race.id);

      // Get all previously published races for this series (outside the transaction)
      const q = query(this.racesCollection, where('seriesId', '==', series.id));
      const existingRacesSnapshot = await getDocs(q);
      const existingRaces = existingRacesSnapshot.docs.map(d => d.data());

      // The full set of races to be scored includes existing ones plus the current one
      const allRacesToScore = [
         ...existingRaces.filter(r => r.id !== race.id),
         race,
      ].sort((a, b) => a.index - b.index);

      // TO DO - just give the published results are OK except for this race
      // We just need the competorots in this race
      // Get all competitors who have ever sailed in the series
      const allSeriesCompetitors = this.rcs.selectedCompetitors().filter(c => c.seriesId === race.seriesId);

      // Score the race and update any publiched results if they are impacted. 
      const { scoredRaces, seriesResults } = score(series, [race], allSeriesCompetitors, {
         seriesType: series.scoringScheme.scheme,
         discards: this.calculateDiscards(series, allRacesToScore.length),
      });

      await runTransaction(this.firestore, async (transaction) => {
         // 2. Read published season
         const seasonDocRef = doc(this.seasonsCollection, series.season);
         const seasonDoc = await transaction.get(seasonDocRef);
         const seasonData = seasonDoc.exists() ? seasonDoc.data() : { id: series.season, series: [] };

         // 5. Save all race results for the series. This ensures that any races whose points
         // were altered by a change in the number of series competitors (for DNC scores) are updated.
         scoredRaces.forEach(r => {
            const raceRef = doc(this.racesCollection, r.id);
            transaction.set(raceRef, r);
         });

         const seriesResultsDocRef = doc(this.seriesResultsCollection, series.id);
         transaction.set(seriesResultsDocRef, seriesResults);

         // 7. Update and save the season summary document
         const seriesSummary: SeriesInfo = {
            id: series.id,
            name: series.name,
            fleetId: series.fleetId,
            raceCount: scoredRaces.length,
            startDate: scoredRaces[0].scheduledStart,
            endDate: scoredRaces[scoredRaces.length - 1].scheduledStart,
            seriesId: series.id,
         };

         const seriesIndex = seasonData.series.findIndex(s => s.id === series.id);
         if (seriesIndex > -1) {
            seasonData.series[seriesIndex] = seriesSummary;
         } else {
            seasonData.series.push(seriesSummary);
         }

         transaction.set(seasonDocRef, seasonData);
      });

      // 8. Update the status of the original race document
      const raceDocRef = doc(this.firestore, `series/${series.id}/races/${race.id}`);
      await updateDoc(raceDocRef, { status: 'Published' });
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