/**
* Results Management
* Operations on the 'results' subcollection of a specific race.
*/
import { inject, Injectable } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FirebaseApp } from '@angular/fire/app';
import { addDoc, collection, collectionData, collectionGroup, deleteDoc, doc, getFirestore, query, updateDoc, where } from '@angular/fire/firestore';
import { map, of, tap } from 'rxjs';
import { CurrentRaces } from './current-races-store';
import { RaceCompetitor } from '../model/race-competitor';
import { classInstanceConverter } from 'app/shared/firebase/firestore-helper';

export interface ResultsPathData {
  raceId: string;
  seriesId: string;
  id: string;
}

export interface ResultsCollectionData {
  raceId: string;
  seriesId: string;
}

const raceCompetitorConverter = classInstanceConverter(RaceCompetitor);


@Injectable({
  providedIn: 'root',
})
export class RaceCompetitorStore {
  private readonly firestore = getFirestore(inject(FirebaseApp));
  private selectedRaces = inject(CurrentRaces);

  private ref = (pd: ResultsPathData) => doc(
    this.firestore,
    `series/${pd.seriesId}/races/${pd.raceId}/results`,
    pd.id).withConverter(raceCompetitorConverter);

  private collection = (pd: ResultsCollectionData) => collection(
    this.firestore, `series/${pd.seriesId}/races/${pd.raceId}/results`).withConverter(raceCompetitorConverter);

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
        ).withConverter(raceCompetitorConverter);
        return collectionData(q).pipe(
          map(rc => rc.sort(sortEntries)),
          tap(rc => console.log(`RaceCompetitorStore. Loaded ${rc.length} competitors`))
        );
      }
    },
    defaultValue: []
  });

  /** Time string fields if they exist on the update object */
  private tidyStrings(comp: Partial<RaceCompetitor>): Partial<RaceCompetitor> {
    const update = { ...comp };
    if (update.helm) {
      update.helm = update.helm.trim();
    }
    if (update.crew) {
      update.crew = update.crew.trim();
    }
    if (update.boatClass) {
      update.boatClass = update.boatClass.trim();
    }
    return update;
  }

  readonly selectedCompetitors = this.selectedCompResource.value.asReadonly();
  readonly loading = this.selectedCompResource.isLoading;
  readonly error = this.selectedCompResource.error;

  async addResult(pd: { seriesId: string, raceId: string; }, result: Partial<RaceCompetitor>): Promise<string> {
    const update = this.tidyStrings(result);
    const ref = await addDoc(this.collection(pd), update);
    return ref.id;
  }

  async updateResult(pd: ResultsPathData, changes: Partial<RaceCompetitor>) {
    const path = `series/${pd.seriesId}/races/${pd.raceId}/results/${pd.id}`;
    const update = this.tidyStrings(changes);
    await updateDoc(doc(this.firestore, path), update);
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