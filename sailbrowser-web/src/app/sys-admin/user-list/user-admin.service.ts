import { Injectable, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { FirebaseApp } from '@angular/fire/app';
import { collection, collectionData, getFirestore } from '@angular/fire/firestore';
import { AuthService } from 'app/auth/auth.service';
import { dataObjectConverter } from 'app/shared/firebase/firestore-helper';
import { UserData } from 'app/user/user';
import { of } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class UserAdminService {
   private fs = getFirestore(inject(FirebaseApp));
   private as = inject(AuthService);

   private userCollection = collection(this.fs, 'users').withConverter(dataObjectConverter<UserData>());

   private _load = signal(false);

   private _usersResource = rxResource<UserData[], boolean>({
      params: this._load,
      stream: shouldLoad =>
         shouldLoad ? collectionData(this.userCollection) : of([]),
   });

   /** Triggers the loading of all users. */
   load(): void {
      this._load.set(true);
   }

   /** Signal that emits the array of all users. */
   readonly users = this._usersResource.value.asReadonly();
   readonly loading = this._usersResource.isLoading;
   readonly error = this._usersResource.error;
   readonly status = this._usersResource.status;
}