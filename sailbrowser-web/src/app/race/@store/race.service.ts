/**
* Results Management
* Operations on the 'results' subcollection of a specific race.
*/
import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { addDoc, collectionData, deleteDoc, doc, getFirestore, updateDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { mappedCollectionRef, mappedDoc } from 'app/shared/firebase/firestore-helper';
import { RaceResult } from '../race-result';

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
export class RaceResultsService {
  private readonly firestore = getFirestore(inject(FirebaseApp));  

  private ref = (pd: ResultsPathData) => mappedDoc<RaceResult>(
    this.firestore, 
    `series/${pd.seriesId}/races/${pd.raceId}/results`,
    pd.id);

  private collection = (pd: ResultsCollectionData) =>  mappedCollectionRef<RaceResult>(
    this.firestore, `series/${pd.seriesId}/races/${pd.raceId}/results`);

  getResults(pd: ResultsPathData): Observable<RaceResult[]> {
    
    // Return results sorted by position (or points) by default
    return collectionData(this.collection(pd), { idField: 'id' }).pipe(
      map(results => results.sort((a, b) => (a['position'] || 999) - (b['position'] || 999)))
    );
  }

  async addResult(pd: ResultsPathData, result: Partial<RaceResult>) {
    await addDoc(this.collection(pd), result);
  }

  async updateResult(pd: ResultsPathData, changes: Partial<RaceResult>) {
    const path = `series/${pd.seriesId}/races/${pd.raceId}/results/${pd.id}`;
    await updateDoc(doc(this.firestore, path), changes);
  }

  async deleteResult(pd: ResultsPathData) {
    const path = `series/${pd.seriesId}/races/${pd.raceId}/results/${pd.id}`;
    await deleteDoc(doc(this.firestore, path));
  }
}