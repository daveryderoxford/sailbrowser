import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { addDoc, deleteDoc, getDocs, getFirestore, setDoc, writeBatch } from '@angular/fire/firestore';
import { mappedCollectionRef, mappedDoc } from '../../shared/firebase/firestore-helper';
import { Race } from './race';
import { Series } from './series';

export interface RaceSeriesDetails {
  id: string;
  name: string;
  fleetId: string;
}

@Injectable({
  providedIn: 'root',
})
export class RaceCalendarStoreBase {
  protected readonly firestore = getFirestore(inject(FirebaseApp));  

  protected ref = (id: string) => mappedDoc<Series>(this.firestore, 'series', id);
  protected readonly seriesCollection = mappedCollectionRef<Series>(this.firestore, '/series'); 

  /** Add a series retruning a document Id */
  async addSeries(series: Partial<Series>): Promise<string> {
    series.archived = false;
    const ref = await addDoc(this.seriesCollection, series);
    return ref.id;
  }

  async updateSeries(id: string, data: Partial<Series>) {
    await setDoc(this.ref(id), data, { merge: true });
  }

  async deleteSeries(id: string) {
    // Delete races for the series. 
    const racesSnapshot = await getDocs(this.racesCollection(id));

    const batch = writeBatch(this.firestore);
    racesSnapshot.forEach(doc => batch.delete(doc.ref));
    
    // Delete the series in the batch
    batch.delete(this.ref(id));

    await batch.commit();
  }

  private raceRef = (seriesId: string, id: string) => mappedDoc<Race>(this.firestore, `/series/${seriesId}/races`, id);
  private racesCollection = (seriesId: string) => mappedCollectionRef<Race>(this.firestore, `/series/${seriesId}/races`);

  async addRace(seriesDetails: RaceSeriesDetails, race: Partial<Race>): Promise<void> {
    race.seriesId = seriesDetails.id;
    race.seriesName = seriesDetails.name;
    race.fleetId = seriesDetails.fleetId;
    race.status = 'Future';
    await addDoc(this.racesCollection(race.seriesId),race);
  }

  async updateRace(seriesId: string, raceId: string, data: Partial<Race>): Promise<void> {
    await setDoc(this.raceRef(seriesId, raceId), data, { merge: true });
  }

  async deleteRace(seriesId: string, race: Race): Promise<void> {
    await deleteDoc(this.raceRef(seriesId, race.id));
  }
}

export function seriesSort(a: Series, b: Series): number {
  if (!a.startDate) {
    return !b.startDate ? 1 : 0;
  }

  if (!b.startDate) {
    return -1;
  }

  const ret = a.startDate.getTime() - b.startDate.getTime();
  if (ret !== 0) {
    return ret;
  } else {
    return a.fleetId.localeCompare(b.fleetId);
  }
}

export function sortRaces(a: Race, b: Race): number {
  const ret = a.scheduledStart.getTime() - b.scheduledStart.getTime();

  if (ret === 0) {
    return a.raceOfDay - b.raceOfDay;
  } else {
    return ret;
  }
}