import { Injectable, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FirebaseApp } from '@angular/fire/app';
import { addDoc, collectionData, deleteDoc, doc, getFirestore, updateDoc } from '@angular/fire/firestore';
import { typedCollectionRef } from 'app/shared/firebase/firestore-helper';
import { normaliseString } from 'app/shared/utils/string-utils';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoatsStore {
  private readonly firestore = getFirestore(inject(FirebaseApp));
  private readonly boatsCollection = typedCollectionRef<Boat>(this.firestore, '/boats');

  private readonly boatsResource = rxResource({
    stream: (): Observable<Boat[]> =>
      collectionData(this.boatsCollection, { idField: 'id' }).pipe(
        map(boats => boats.sort(boatsSort))),
    defaultValue: [],
  });

  trimStrings(boat: Partial<Boat>) {
    const update = { ...boat };
    if (update.helm) {
      update.helm = update.helm.trim();
    }
    if (update.crew) {
      update.crew = update.crew.trim();
    }
    if (update.boatClass) {
      update.boatClass = update.boatClass.trim();
    }
    if (update.name) {
      update.name = update.name.trim();
    }

    return update
  }

  /** Collection of all boats */
  readonly boats = this.boatsResource.value.asReadonly();
  readonly isLoading = this.boatsResource.isLoading;
  readonly error = this.boatsResource.error;

  async add(boat: Partial<Boat>): Promise<void> {
    const update = this.trimStrings(boat);
    await addDoc(this.boatsCollection, update);
  }

  async update(id: string, data: Partial<Boat>): Promise<void> {
    const docRef = doc(this.firestore, `boats/${id}`);
    const update = this.trimStrings(data);
    await updateDoc(docRef, update);
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(this.firestore, `boats/${id}`);
    await deleteDoc(docRef);
  }
}

/** Sort boats by sail number then class */
export function boatsSort(a: Boat, b: Boat): number {
  const ca = normaliseString(a.boatClass);
  const cb = normaliseString(b.boatClass);

  if (ca != cb) {
    return ca.localeCompare(cb);
  } else {
    return a.sailNumber < b.sailNumber ? -1 : 1;
  }
}

/** Returns if a boat matches a filter string.
 * Case insensitive 
 */
export function boatFilter(boat: Boat, search: string | null): boolean {

  const filter = normaliseString(search);

  return !filter || filter === '' ||
    normaliseString(boat.name).includes(filter) ||
    normaliseString(boat.helm).includes(filter) ||
    normaliseString(boat.crew).includes(filter) ||
    boat.sailNumber.toString().includes(filter) ||
    normaliseString(boat.boatClass).includes(filter) ||
    (boat.isClub && 'club'.includes(filter));
}
