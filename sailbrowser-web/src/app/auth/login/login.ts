import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import {
   Auth,
   FacebookAuthProvider, GoogleAuthProvider, UserCredential, getRedirectResult,
   signInWithEmailAndPassword, signInWithPopup, signInWithRedirect
} from '@angular/fire/auth';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { FlexModule } from '@ngbracket/ngx-layout/flex';
import { Toolbar } from 'app/shared/components/toolbar';
import { DialogsService } from 'app/shared/dialogs/dialogs.service';
import { getFirebaseErrorMessage } from '../firebase-error-messages';

export type AuthType = "EmailAndPassword" | "Google" | "Facebook";

const facebookAuthProvider = new FacebookAuthProvider();
const googleAuthProvider = new GoogleAuthProvider();

const isInStandaloneMode = () =>
   (window.matchMedia('(display-mode: standalone)').matches) ||
   ((window.navigator as any).standalone) ||
   document.referrer.includes('android-app://');

@Component({
   selector: 'app-login',
   templateUrl: './login.html',
   styleUrls: ['./login.scss'],
   imports: [MatCardModule, Toolbar, FlexModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
   private router = inject(Router);
   private formBuilder = inject(NonNullableFormBuilder);
   private afAuth = inject(Auth);
   private snackBar = inject(MatSnackBar);
   private dialogs = inject(DialogsService);

   loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
   });

   loading = signal(false);

   returnUrl = input(''); //Route parameter

   async loginFormSubmit() {
      if (this.loginForm.valid) {
         await this.signInWith("EmailAndPassword", this.loginForm.getRawValue());
      }
   }

   async signInWith(provider: AuthType, credentials?: { email: string, password: string; }) {

      try {
         this.loading.set(true);

         let userDetails: UserCredential | null;

         switch (provider) {

            case "EmailAndPassword":
               userDetails = await signInWithEmailAndPassword(this.afAuth, credentials!.email, credentials!.password);
               break;
               
            case "Google":
               userDetails = await this._thirdPartySignIn(googleAuthProvider);
               break;

            case "Facebook":
               userDetails = await this._thirdPartySignIn(facebookAuthProvider);
               break;
         }
         this._handleSignInSuccess();
      } catch (err) {
         this._handleSigninError(err);
      } finally {
         this.loading.set(false);
      }
   }

   /** Sign in with redirect for PWA and popup for browser.
    * Sign in with popup avoids re-loading the application on the browser.
    * TODO Review which method is better for mobile devices where popups are not handled as well
   */
   private async _thirdPartySignIn(provider: GoogleAuthProvider | FacebookAuthProvider): Promise<UserCredential | null> {
      if (isInStandaloneMode()) {
         await signInWithRedirect(this.afAuth, provider);
         const result = await getRedirectResult(this.afAuth);
         if (result === null || result.user === null) {
            return null;
         }
         return result;
      } else {
         return await signInWithPopup(this.afAuth, provider);
      }
   }

   private _handleSigninError(err: any) {
      let errorMessage = 'An unexpected error occurred. Please try again.';

      if (err instanceof FirebaseError) {
         errorMessage = getFirebaseErrorMessage(err);
         console.log(`LoginComponent: Firebase error code: ${err.code} message: ${errorMessage}`);

         // Show dialog to highlight duplicate crdentials to highlight this error 
         if (err.code === 'auth/account-exists-with-different-credential') {
            const email = this.loginForm.get('email')!.value;
            this.dialogs.message('Account Exists',
               `An account already exists for ${email} but with a different sign-in method.
                Please sign in using the method you originally used.`);
            return;
         }
      } else if (err instanceof Error) {
         console.log(`LoginComponent: Error logging in:${err.message}`);
         errorMessage = `An unexpected error occurred. ${err.message}.  Please try again.`;
      } else {
         console.log('LoginComponent: unexpected error');
      }
      this.snackBar.open(errorMessage, 'Close', { duration: 5000 });
   }

   private _handleSignInSuccess() {
      console.log('LoginComponent: Successful login');
      this.router.navigateByUrl(this.returnUrl());
   }
}
