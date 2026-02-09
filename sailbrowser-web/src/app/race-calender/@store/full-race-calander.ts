import { computed, Injectable, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Series } from './series';
import { Race } from './race';
import { mappedConverter } from 'app/shared/firebase/firestore-helper';
import { collectionData, query, where, collectionGroup } from '@angular/fire/firestore';
import { Observable, map, tap } from 'rxjs';
import { RaceCalendarStoreBase, seriesSort, sortRaces } from './race-calendar-store-base';

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
         ).withConverter(mappedConverter<Race>());
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
}