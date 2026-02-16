import { ChangeDetectionStrategy, Component, computed, inject, input, signal, viewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BoatForm } from './boat-form';
import { DialogsService } from '../../shared';
import { Toolbar } from 'app/shared/components/toolbar';
import { BoatsStore } from '../@store/boats.store';
import { DuplicateBoatCheck } from '../duplicate-boat-check/duplicate-check-service';

@Component({
  selector: 'app-boat-edit',
  imports: [BoatForm, Toolbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
   <app-toolbar title="Edit Boat" showBack/>

    <app-boat-form [boat]="boat()" (submitted)="submitted($event)" (deleted)="deleted($event)"></app-boat-form>
  `,
  styles: [],
})
export class BoatEdit {
  private bs = inject(BoatsStore);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private ds = inject(DialogsService);
  private dupCheck = inject(DuplicateBoatCheck);

  id = input.required<string>();   // Route parameter

  boat = computed(() => this.bs.boats().find(l => l.id === this.id())!);

  busy = signal(false);

  readonly form = viewChild.required(BoatForm);

  async submitted(data: Partial<Boat>) {
    try {
      this.busy.set(true);
      const save = await this.dupCheck.duplicateCheck(data);
      if (save) {
        await this.bs.update(this.id(), data);
        this.router.navigate(["/boats"]);
      }
    } catch (error: any) {
      this.snackbar.open("Error encountered updating boat details", "Dismiss", { duration: 3000 });
      console.log('UpdateBoat. Error updating boat details: ' + error.toString());
    } finally {
      this.busy.set(false);
    }
  }

  async deleted(boat: Boat) {
    const ok = await this.ds.confirm("Delete boat", "Delete boat");
    if (ok) {
      try {
        this.busy.set(true);

        await this.bs.delete(boat.id);
        this.router.navigate(["/boats"]);
      } catch (error: any) {
        this.snackbar.open("Error encountered deleting task", "Error encountered deleting task", { duration: 3000 });
        console.log('UpdateTask. Error deleting task: ' + error.toString());
      } finally {
        this.busy.set(false);
      }
    }
  }

  canDeactivate(): boolean {
    return this.form().canDeactivate();
  }
}
