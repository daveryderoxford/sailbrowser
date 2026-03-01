
import { Injectable, Signal, computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FirebaseApp } from '@angular/fire/app';
import { arrayRemove, arrayUnion, doc, docData, getFirestore, updateDoc, } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { dataObjectConverter } from '../../shared/firebase/firestore-helper';
import { Club } from '../model/club';
import { Fleet } from '../model/fleet';
import { BoatClass } from '../model/boat-class';
import { Season } from 'app/race-calender/model/season';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private readonly firestore = getFirestore(inject(FirebaseApp));
  private readonly clubDoc = doc(this.firestore, 'systemdata', 'clubdata').withConverter(dataObjectConverter<Club>());

  private readonly clubResource = rxResource({
    stream: (): Observable<Club> =>
      docData(this.clubDoc) as Observable<Club>,
    defaultValue: { name: '', fleets: [], classes: [], seasons: [] }
  });

  readonly club = this.clubResource.value.asReadonly();
  readonly isLoading = this.clubResource.isLoading;
  readonly error = this.clubResource.error;

  async update(id: string, data: Partial<Club>): Promise<void> {
    await updateDoc(this.clubDoc, data);
  }

  async addFleet(fleet: Fleet) {
    await updateDoc(this.clubDoc, { fleets: arrayUnion(fleet) });
  }

  async removeFleet(fleet: Fleet) {
    await updateDoc(this.clubDoc, { fleets: arrayRemove(fleet) });
  }

  async addClass(boatClass: BoatClass) {
    await updateDoc(this.clubDoc, { classes: arrayUnion(boatClass) });
  }

  async removeClass(boatClass: BoatClass) {
    await updateDoc(this.clubDoc, { classes: arrayRemove(boatClass) });
  }

  async addSeason(season: Season) {
    await updateDoc(this.clubDoc, { seasons: arrayUnion(season) });
  }

  async removeSeason(season: Season) {
    await updateDoc(this.clubDoc, { seasons: arrayRemove(season) });
  }

  /** Find fleet  by id */
  findFleet(id: string): Signal<Fleet | undefined> {
    return computed(() => this.club().fleets.find(f => f.id === id));
  }

  /** Find season  by id */
  findSeason(id: string): Signal<Season | undefined> {
    return computed(() => this.club().seasons.find(s => s.id === id));
  }

  /** Find season  by id */
  findClass(id: string): Signal<BoatClass | undefined> {
    return computed(() => this.club().classes.find(c => c.id === id));
  }
}
