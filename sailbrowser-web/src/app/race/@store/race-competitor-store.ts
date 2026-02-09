/**
* Results Management
* Operations on the 'results' subcollection of a specific race.
*/
import { inject, Injectable, Injector } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { addDoc, collectionData, collectionGroup, deleteDoc, doc, getFirestore, query, updateDoc, where } from '@angular/fire/firestore';
import { map, of, switchMap, tap } from 'rxjs';
import { mappedCollectionRef, mappedConverter, mappedDoc } from 'app/shared/firebase/firestore-helper';
import { RaceCompetitor } from './race-competitor';
import { rxResource, toObservable } from '@angular/core/rxjs-interop';
import { SelectedRaces } from '../selected-races-store';

export interface ResultsPathData {
  raceId: string;
  seriesId: string;
  id: string;
}

export interface ResultsCollectionData {
  raceId: string;
  seriesId: string;
}

@Injectable({
  providedIn: 'root',
})
export class RaceCompetitorStore {
  private readonly firestore = getFirestore(inject(FirebaseApp));
  private selectedRaces = inject(SelectedRaces);

  private ref = (pd: ResultsPathData) => mappedDoc<RaceCompetitor>(
    this.firestore,
    `series/${pd.seriesId}/races/${pd.raceId}/results`,
    pd.id);

  private collection = (pd: ResultsCollectionData) => mappedCollectionRef<RaceCompetitor>(
    this.firestore, `series/${pd.seriesId}/races/${pd.raceId}/results`);

  /** Race competitors in selected races */
  private readonly selectedCompResource = rxResource({
    params: () => this.selectedRaces.selectedRaceIds(),
    stream: (data) => {
      const selectedIds = data.params;
      if (selectedIds.length === 0) {
        return of([]);
      } else {
        const q = query(
          collectionGroup(this.firestore, 'results'),
          where('raceId', 'in', selectedIds)
        ).withConverter(mappedConverter<RaceCompetitor>());
        return collectionData(q).pipe(
          map(rc => rc.sort(sortEntries)),
          tap(rc => console.log(`RaceCompetitorStore. Loaded ${rc.length} competitors`))
        );
      }
    },
    defaultValue: []
  });

  readonly selectedCompetitors = this.selectedCompResource.value.asReadonly();
  readonly loading = this.selectedCompResource.isLoading;
  readonly error = this.selectedCompResource.error;

  async addResult(pd: { seriesId: string, raceId: string; }, result: Partial<RaceCompetitor>): Promise<string> {
    const ref = await addDoc(this.collection(pd), result);
    return ref.id;
  }

  async updateResult(pd: ResultsPathData, changes: Partial<RaceCompetitor>) {
    const path = `series/${pd.seriesId}/races/${pd.raceId}/results/${pd.id}`;
    await updateDoc(doc(this.firestore, path), changes);
  }

  async deleteResult(pd: ResultsPathData) {
    const path = `series/${pd.seriesId}/races/${pd.raceId}/results/${pd.id}`;
    await deleteDoc(doc(this.firestore, path));
  }
}

/** Sort entries by speed, class and sail number */
export function sortEntries(a: RaceCompetitor, b: RaceCompetitor): number {
  const classCompare = a.boatClass.localeCompare(b.boatClass);
  if (classCompare !== 0) {
    return classCompare;
  }
  return a.sailNumber - b.sailNumber;
}