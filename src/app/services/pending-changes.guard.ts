import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

export interface ComponentCanDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PendingChangesGuard implements CanDeactivate<ComponentCanDeactivate> {

  canExit = false;

  constructor(public alertController: AlertController) {}

  async canDeactivate(component: ComponentCanDeactivate): Promise<boolean> {

    if (component.canDeactivate()) {
      return true;
    } else {
      const msg = 'You have unsaved changes. \n Press Cancel to go back and save these changes, or Discard to lose these changes.';
      const ret = await this.alertMsg('Unsaved changes', msg);
      return (ret);
    }
  }

  async alertMsg(header: string, message: string): Promise<boolean> {

    let result = false;

    const m = await this.alertController
      .create({
        header: header,
        message: message,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => { result = false; return true; }
          },
          {
            text: 'Discard',
            handler: () => { result = true; return true; }

          },
        ],
      });

    await m.present();
    await m.onDidDismiss();
    return result;
  }
}
