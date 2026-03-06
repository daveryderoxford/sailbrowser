import { Injectable, inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ClubService } from './club.service';

@Injectable({ providedIn: 'root' })
export class ClubContextService {
   private _clubId: string = '';
   private _config: any = null;

   get clubId() { return this._clubId; }

   private firestore = inject(Firestore);
   private clubStore = inject(ClubService);

   async initialize(): Promise<void> {
      const host = window.location.hostname;

      // Resolve ID from subdomain
      if (host.endsWith('.localhost')) {
         this._clubId = host.replace('.localhost', '');
      } else {
         this._clubId = host.split('.')[0];
      }

      // Read club data and verify that the clubid corresponds
      // If readf fails redirect to 'all clubs' page TODO
      try {
         const club = await this.clubStore.initialize(this._clubId);

         if (!club || club.id !== this._clubId) {
            // Handle unknown tenant club selection page
            window.location.href = 'https://main-site.com/404';
         }
      } catch (e) {
         console.error('Context Initialization Failed', e);
         window.location.href = 'https://main-site.com/404';
      }
   }
}