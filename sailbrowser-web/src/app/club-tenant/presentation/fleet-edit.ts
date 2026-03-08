import { ChangeDetectionStrategy, Component, computed, inject, input, signal, viewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FleetForm } from './fleet-form/fleet-form';
import { Toolbar } from 'app/shared/components/toolbar';
import { Fleet } from '../model/fleet';
import { DialogsService } from 'app/shared/dialogs/dialogs.service';
import { ClubStore } from '../services/club-store';

@Component({
  selector: 'app-fleet-edit',
  standalone: true,
  imports: [FleetForm, Toolbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
   <app-toolbar [title]="'Edit Fleet - ' + fleet()?.name" showBack/>
    @if (fleet()) {
      <app-fleet-form [fleet]="fleet()" (submitted)="submitted($event)"></app-fleet-form>
    }
  `,
})
export class FleetEdit {
  private store = inject(ClubStore);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  private ds = inject(DialogsService);

  id = input.required<string>();

  fleet = computed(() => this.store.club().fleets.find(f => f.id === this.id()));

  busy = signal(false);

  readonly form = viewChild.required(FleetForm);

  async submitted(data: Partial<Fleet>) {
    try {
      this.busy.set(true);
      // TO do update the complete fleet array and update the fleets array
      await this.store.update(data);
      this.router.navigate(["/club/fleets"]);
    } catch (error: any) {
      this.snackbar.open("Error encountered updating fleet details", "Dismiss", { duration: 3000 });
      console.error('UpdateFleet. Error updating fleet details: ', error);
    } finally {
      this.busy.set(false);
    }
  }

  canDeactivate(): boolean {
    return this.form().canDeactivate();
  }
}
