import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
   private history: string[] = [];

   constructor(
      private router: Router,
      private location: Location
   ) {
      // Listen to router events of type NavigationEnd to
      // manage an app-specific navigation history.
      this.router.events.subscribe((event) => {
         if (event instanceof NavigationEnd) {
            this.history.push(event.urlAfterRedirects);
         }
      });
   }

   /**
    * Manage back navigation.
    */
   back(): void {
      this.history.pop();

      // If the history still contains entries after popping
      // the current URL off of the stack, we can safely
      // navigate back. Otherwise we're falling back to the
      // application root.
      if (this.history.length > 0) {
         console.log('navigating back');
         this.location.back();
      } else {
         console.log('navigating to /');
         this.router.navigateByUrl('/');
      }
   }
}