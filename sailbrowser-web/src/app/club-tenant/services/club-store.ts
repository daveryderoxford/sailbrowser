
import { Injectable, Signal, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FirebaseApp } from '@angular/fire/app';
import { arrayRemove, arrayUnion, doc, docData, getFirestore, setDoc, updateDoc, } from '@angular/fire/firestore';
import { firstValueFrom, filter, Observable } from 'rxjs';
import { Club } from '../model/club';
import { Fleet } from '../model/fleet';
import { BoatClass } from '../model/boat-class';
import { Season } from 'app/race-calender/model/season';
import { dataObjectConverter } from 'app/shared/firebase/firestore-helper';

@Injectable({
  providedIn: 'root',
})
export class ClubStore {
  private readonly firestore = getFirestore(inject(FirebaseApp));

  private _confirmedId = signal<string | undefined>(undefined);

  clubDoc = computed(() => {
    if (this._confirmedId()) {
      return doc(this.firestore, 'clubs', this._confirmedId()!)
        .withConverter(dataObjectConverter<Club>());
    } else
      return undefined;
  });

  private _clubResource = rxResource({
    params: () => this.clubDoc(),
    stream: () => {
      return docData(this.clubDoc()!).pipe(
        filter(data => !!data) // Ensure nulls are not emitted
      ) as Observable<Club>;
    },
    defaultValue: { id: '', name: '', fleets: [], classes: [], seasons: [] }
  });

  public club = this._clubResource.value.asReadonly();
  public isLoading = this._clubResource.isLoading;
  public error = this._clubResource.error;

  /**
   * Sychranously retrive club data to ensure and 
   * start monitoring for changed to the club's data 
   */
  async initialize(id: string): Promise<Club | undefined> {
    const clubDocRef = doc(this.firestore, 'clubs', id).withConverter(dataObjectConverter<Club>());

    const club = await firstValueFrom(docData(clubDocRef));

    // Start monitoring for edit to club's data 
    this._confirmedId.set(id);

    return club;
  }

  async update(update: Partial<Club>) {
    return await setDoc(this.clubDoc()!, update);
  }

  async addFleet(fleet: Fleet) {
    await updateDoc(this.clubDoc()!, { fleets: arrayUnion(fleet) });
  }

  async removeFleet(fleet: Fleet) {
    await updateDoc(this.clubDoc()!, { fleets: arrayRemove(fleet) });
  }

  async addClass(boatClass: BoatClass) {
    await updateDoc(this.clubDoc()!, { classes: arrayUnion(boatClass) });
  }

  async removeClass(boatClass: BoatClass) {
    await updateDoc(this.clubDoc()!, { classes: arrayRemove(boatClass) });
  }

  async addSeason(season: Season) {
    await updateDoc(this.clubDoc()!, { seasons: arrayUnion(season) });
  }

  async removeSeason(season: Season) {
    await updateDoc(this.clubDoc()!, { seasons: arrayRemove(season) });
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
