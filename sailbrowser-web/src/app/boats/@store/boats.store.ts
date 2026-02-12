import { Injectable, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FirebaseApp } from '@angular/fire/app';
import { addDoc, collectionData, deleteDoc, doc, getFirestore, updateDoc } from '@angular/fire/firestore';
import { typedCollectionRef } from 'app/shared/firebase/firestore-helper';
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

  /** Collection of all boats */
  readonly boats = this.boatsResource.value.asReadonly();
  readonly isLoading = this.boatsResource.isLoading;
  readonly error = this.boatsResource.error;

  async add(boat: Partial<Boat>): Promise<void> {
    await addDoc(this.boatsCollection, boat);
  }

  async update(id: string, data: Partial<Boat>): Promise<void> {
    const docRef = doc(this.firestore, `boats/${id}`);
    await updateDoc(docRef, data);
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(this.firestore, `boats/${id}`);
    await deleteDoc(docRef);
  }
}

/** Sort boats by sail number then class */
export function boatsSort(a: Boat, b: Boat): number {
  const ca = a.boatClass.toLowerCase();
  const cb = b.boatClass.toLowerCase();

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

  const filter = search?.toLowerCase();

  return !filter || filter === '' ||
    boat.name.toLowerCase().includes(filter) ||
    boat.helm.toLowerCase().includes(filter) ||
    boat.crew.toLowerCase().includes(filter) ||
    boat.sailNumber.toString().includes(filter) ||
    boat.boatClass.toLowerCase().includes(filter) ||
    boat.isClub && 'club'.includes(filter);
}


