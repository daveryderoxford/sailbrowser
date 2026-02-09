import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogsService } from '../dialogs/dialogs.service';

export interface ComponentCanDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export const pendingChangesGuard: CanDeactivateFn<ComponentCanDeactivate> = (component: ComponentCanDeactivate) => {
  const ds = inject(DialogsService);
  if (component.canDeactivate()) {
    return true;
  } else {
    return ds.confirm(' Unsaved changes',
      'You have unsaved changes.  \n Press Cancel to go back and save these changes, or OK to lose these changes.');
  }
}
