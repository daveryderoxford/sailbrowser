import { Injectable, computed, inject } from "@angular/core";
import { rxResource } from '@angular/core/rxjs-interop';
import { User } from "@angular/fire/auth";
import { DocumentReference, arrayRemove, arrayUnion, doc, docData, setDoc, updateDoc } from "@angular/fire/firestore";
import { AuthService } from 'app/auth';
import { Boat } from 'app/boats';
import { createClubSubCollectionRef } from 'app/club-tenant';
import { of } from 'rxjs';
import { UserData } from '../model/user';

@Injectable({
  providedIn: "root"
})
export class UserDataService {
  private as = inject(AuthService);

  private userCollection = createClubSubCollectionRef<UserData>('users');
  
  private _userResource = rxResource<UserData | undefined, User| undefined>({
    params: () => this.as.user(),
    stream: request => request.params ? docData(this._doc(request.params.uid)) : of(undefined)
  });

  readonly user = this._userResource.value.asReadonly();

  key = computed( () => this.user()?.key);

  /** Update the user info.  */
  async updateDetails(details: Partial<UserData>): Promise<void> {

    const key = this.key();

    if (!key) {
      console.error('UserDataService: Saving user: Unexpectedly null');
      throw new Error('UserDataService: Saving user: Unexpectedly null');
    }

    console.log('UserDataService: Saving user ' + this);
    details.key = key;
    // Use setDoc with merge=true rather than update as update does not support withConverter
    await setDoc(this._doc(key), details, { merge: true });
  }

  private _doc(uid: string): DocumentReference<UserData> {
    return doc(this.userCollection, uid)
  }

  async addBoat(boat: Boat) {
    await updateDoc(this._doc(this.key()!), { boats: arrayUnion(boat) });
  }

  async removeBoat(boat: Boat) {
    await updateDoc(this._doc(this.key()!), { classes: arrayRemove(boat) });
  }
}
