import { Injectable, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { collectionData } from '@angular/fire/firestore';
import { AuthService } from 'app/auth/auth.service';
import { of } from 'rxjs';
import { UserData } from '../../user/model/user';
import { FirestoreTenantService } from 'app/club-tenant';

@Injectable({
   providedIn: 'root'
})
export class UserAdminService {
   private as = inject(AuthService);
  private readonly tenant = inject(FirestoreTenantService);

   private userCollection = this.tenant.collectionRef<UserData>('users');
   
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