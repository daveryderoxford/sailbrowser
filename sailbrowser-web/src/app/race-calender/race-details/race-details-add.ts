import { ChangeDetectionStrategy, Component, inject, input, viewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Toolbar } from 'app/shared/components/toolbar';
import { RaceDetailsForm } from './race-details-form';
import { Race } from '../@store/race';
import { RaceCalendarStore } from '../@store/full-race-calander';

@Component({
  selector: 'app-series-add',
  imports: [RaceDetailsForm, Toolbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-toolbar title="Add Race" showBack/>
    <app-race-details-form (submitted)="submitted($event)"/>
  `
})
export class RaceAdd {
  private rcs = inject(RaceCalendarStore);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);

  seriesId = input.required<string>() // Route parameter

  series = this.rcs.getSeries(this.seriesId);

  readonly form = viewChild.required(RaceDetailsForm);

  async submitted(race: Partial<Race>) {
    try {
      await this.rcs.addRace(this.series()!, race);
      this.router.navigate(['race-calender/series-details', this.seriesId()]);
    } catch (error: any) {
      this.snackbar.open('Error adding Series', 'Close', { duration: 3000 });
    }
  }

  canDeactivate = () => this.form().canDeactivate();
}
