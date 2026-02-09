import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BoatForm } from './boat-form';
import { Toolbar } from 'app/shared/components/toolbar';
import { BoatsStore } from '../@store/boats.store';

@Component({
  selector: 'app-boat-add',
  imports: [BoatForm, Toolbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
   <app-toolbar title="Add Boat" showBack/>
    <app-boat-form (submitted)="submitted($event)"></app-boat-form>
  `,
  styles: [],
})
export class BoatAdd {
  private bs = inject(BoatsStore);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);

  readonly form = viewChild.required(BoatForm);

  async submitted(boat: Partial<Boat>) {
    try {
      await this.bs.add(boat);
      this.router.navigate(["/boats"]);
    } catch (error: any) {
      this.snackbar.open("Error encountered adding Boat", "Error encountered adding Boat", { duration: 3000 });
      console.log('AddBoat.  Error adding Boat: ' + error.toString());
    }
  }

  canDeactivate(): boolean {
    return this.form().canDeactivate();
  }
}