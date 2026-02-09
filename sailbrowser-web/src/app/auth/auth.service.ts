import { Injectable, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState, signOut } from '@angular/fire/auth';
import { map } from 'rxjs';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   auth = inject(Auth);

   private user$ = authState(this.auth).pipe(
      map(val => val === null ? undefined : val)
   );
   
   user = toSignal(this.user$);

   loggedIn = computed<boolean>( () => this.user() !== undefined );

   isSysAdmin = computed<boolean>(() => {
      return this.user() ? this.user()!.uid === 'Uw4HKGlcHla1Fm8Zw8B7DBVyl1j1' : false;
   });

   // TODO could implement with secure firestore collection or custom claim at some point
   isClubAdmin = computed <boolean>( () => {
      return this.user() ? 
        this.user()!.uid === 'XXX' || this.isSysAdmin(): 
        false;
   });

   isRaceOfficer = computed<boolean>(() => {
      return this.user() ? 
      this.user()!.uid === 'YYY' || this.isClubAdmin(): 
      false;
   });
   
   async signOut(): Promise<void> {
      return signOut(this.auth);
   }
}
