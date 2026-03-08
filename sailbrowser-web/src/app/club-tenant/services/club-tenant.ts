import { Injectable, inject } from '@angular/core';
import { ClubStore } from './club-store';

@Injectable({ 
  providedIn: 'root' 
})
export class ClubContextService {
  private _clubId: string = '';

  get clubId() { return this._clubId; }

  private clubStore = inject(ClubStore);

  /** Called when the application initialises to
   * handle the extracting the clubId from the subdomain and
   * valifdating it. 
   * 
   * This is called before the Angualar router is avaliable
   */
  async initialize(): Promise<void> {

    // Resolve ClubId from subdomain
  /*  const host = window.location.hostname;
    if (host.endsWith('.localhost')) {
      this._clubId = host.replace('.localhost', '');
    } else {
      this._clubId = host.split('.')[0];
    } */
    console.log('Club tenant:  Hard coding club to ibrsc');
    this._clubId = 'ibrsc'

    // Read club data and verify that the clubid corresponds
    // If read fails redirect to 'all clubs' page TODO
    try {
      const club = await this.clubStore.initialize(this._clubId);

      // Check if club is null OR if the ID doesn't match
      if (!club || club.id !== this._clubId) {
        throw new Error(`Club mismatch or not found: Expected ${this._clubId}`);
      }

    } catch (e: unknown) { 

      const errorMessage = e instanceof Error ? e.message : String(e);
      console.error('ClubTenant: Redirecting to club list page as URL does not start with a valid club sub-domain', {
        message: errorMessage,
        originalError: e,
        clubId: this._clubId
      });
      window.location.href = 'https://sailbrowser.com/clublist.html';
    }
  }
}