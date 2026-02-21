import { inject, Injectable } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { addDoc, deleteDoc, getDocs, getFirestore, setDoc, writeBatch, doc, collection } from '@angular/fire/firestore';
import { dataObjectConverter } from '../../shared/firebase/firestore-helper';
import { Race } from '../model/race';
import { Series } from '../model/series';

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

  protected ref = (id: string) => doc(this.firestore, 'series', id).withConverter(dataObjectConverter<Series>());
  protected readonly seriesCollection = collection(this.firestore, '/series').withConverter(dataObjectConverter<Series>()); 

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

  protected raceRef = (seriesId: string, id: string) => doc(this.firestore, `/series/${seriesId}/races`, id).withConverter(dataObjectConverter<Race>());
  protected racesCollection = (seriesId: string) => collection(this.firestore, `/series/${seriesId}/races`).withConverter(dataObjectConverter<Race>());

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