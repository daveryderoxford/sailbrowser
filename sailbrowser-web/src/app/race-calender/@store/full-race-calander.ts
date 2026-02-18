import { computed, Injectable, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Series } from './series';
import { Race } from './race';
import { dataObjectConverter } from 'app/shared/firebase/firestore-helper';
import { collectionData, query, where, collectionGroup, writeBatch, doc } from '@angular/fire/firestore';
import { Observable, map, tap } from 'rxjs';
import { RaceCalendarStoreBase, RaceSeriesDetails, seriesSort, sortRaces } from './race-calendar-store-base';
import { isSameDay } from 'date-fns';

/** Service that returns the complete race calander 
 * Used for race calander administration and planning
 */
@Injectable({
   providedIn: 'root',
})
export class RaceCalendarStore extends RaceCalendarStoreBase {

   // Fetch only active series (not archived)
   private readonly seriesResource = rxResource({
      stream: (): Observable<Series[]> =>
         collectionData(
            query(this.seriesCollection, where('archived', '==', false)),
            { idField: 'id' }
         ).pipe(
            map(seriesList => [...seriesList].sort(seriesSort)),
            tap(seriesList => console.log(`FullRaceCalander. Loaded ${seriesList.length} series`))
         ),
      defaultValue: [],
   });

   private readonly racesResource = rxResource({
      stream: (): Observable<Race[]> => {
         const racesQuery = query(
            collectionGroup(this.firestore, 'races'),
         ).withConverter(dataObjectConverter<Race>());
         return collectionData(racesQuery).pipe(
            map( races => races.sort(sortRaces)),
            tap( races => console.log(`FullRaceCalander. Loaded ${races.length} races`))
         );
      },
      defaultValue: []
   });

   readonly allSeries = this.seriesResource.value.asReadonly();
   readonly isLoading =  this.seriesResource.isLoading;
   readonly error = this.seriesResource.error;

   readonly allRaces = this.racesResource.value.asReadonly();
   readonly racesLoading = this.racesResource.isLoading;
   readonly racesError = this.racesResource.error;

   getSeries(id: Signal<string>): Signal<Series | undefined> {
      return computed(() => this.allSeries().find(s => s.id === id()));
   }

   getRace(id: Signal<string>): Signal<Race | undefined> {
      return computed(() => this.allRaces().find(s => s.id === id()));
   }

   getSeriesRaces(id: Signal<string>): Signal<Race[]> {
      return computed(() => this.allRaces().filter(s => s.seriesId === id()));
   }

    async addRaces(seriesDetails: RaceSeriesDetails, races: Partial<Race>[]): Promise<void> {
      const existingRaces = this.allRaces().filter(r => r.seriesId === seriesDetails.id);
      
      // Create temporary IDs for sorting purposes for new races
      const newRacesWithIds = races.map((race, i) => ({ ...race, id: `new-${i}` })) as Race[];

      const allRacesForSeries = [...existingRaces, ...newRacesWithIds].sort(sortRaces);

      const batch = writeBatch(this.firestore);
      let dayCounter = 0;
      let lastDate: Date | null = null;

      allRacesForSeries.forEach((race, i) => {
         // Recalculate raceOfDay
         if (lastDate && isSameDay(race.scheduledStart, lastDate)) {
            dayCounter++;
         } else {
            dayCounter = 1;
         }
         lastDate = race.scheduledStart;

         const updatedRace: Partial<Race> = {
            ...race,
            index: i + 1,
            raceOfDay: dayCounter,
         };

         if (race.id.startsWith('new-')) {
            // This is a new race, add it to the batch
            const newRaceRef = doc(this.racesCollection(seriesDetails.id));
            // Exclude the temporary id from the data being set
            const { id, ...raceData } = updatedRace;

            batch.set(newRaceRef, {
               ...raceData,
               seriesId: seriesDetails.id,
               seriesName: seriesDetails.name,
               fleetId: seriesDetails.fleetId,
               status: 'Future',
            } as Partial<Race>);
         } else {
            // This is an existing race, update it in the batch
            const raceRef = this.raceRef(seriesDetails.id, race.id);
            batch.update(raceRef, { index: updatedRace.index, raceOfDay: updatedRace.raceOfDay });
         }
      });

      await batch.commit();
   }

   override async deleteRace(seriesId: string, raceToDelete: Race): Promise<void> {
      const remainingRaces = this.allRaces()
         .filter(r => r.seriesId === seriesId && r.id !== raceToDelete.id)
         .sort(sortRaces);

      const batch = writeBatch(this.firestore);

      // First, delete the race
      batch.delete(this.raceRef(seriesId, raceToDelete.id));

      // Then, update the indexes of the remaining races
      let dayCounter = 0;
      let lastDate: Date | null = null;
      remainingRaces.forEach((race, i) => {
         if (lastDate && isSameDay(race.scheduledStart, lastDate)) { dayCounter++; } else { dayCounter = 1; }
         lastDate = race.scheduledStart;
         const raceRef = this.raceRef(seriesId, race.id);
         batch.update(raceRef, { index: i + 1, raceOfDay: dayCounter });
      });

      await batch.commit();
   }
}