
import { Injectable, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FirebaseApp } from '@angular/fire/app';
import { arrayRemove, arrayUnion, doc, docData, getFirestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { dataObjectConverter } from '../../shared/firebase/firestore-helper';
import { BoatClass } from './boat-class';
import { Club } from './club';
import { Fleet } from './fleet';

@Injectable({
  providedIn: 'root',
})
export class ClubService {
  private readonly firestore = getFirestore(inject(FirebaseApp));
  private readonly clubDoc = doc(this.firestore, 'systemdata', 'clubdata').withConverter(dataObjectConverter<Club>());

  private readonly clubResource = rxResource({
    stream: (): Observable<Club> =>
      docData(this.clubDoc) as Observable<Club>,
    defaultValue: { name: '', fleets: [], classes: [] }
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
}
