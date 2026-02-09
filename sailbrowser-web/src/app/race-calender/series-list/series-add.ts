import { ChangeDetectionStrategy, Component, inject, viewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Toolbar } from 'app/shared/components/toolbar';
import { RaceCalendarStore } from '../@store/full-race-calander';
import { Series } from '../@store/series';
import { SeriesForm } from './series-form';

@Component({
  selector: 'app-series-add',
  imports: [SeriesForm, Toolbar],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-toolbar title="Add Series" showBack/>
    <app-series-form (submitted)="submitted($event)"></app-series-form>
  `
})
export class SeriesAdd {
  private rcs = inject(RaceCalendarStore);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);
  readonly form = viewChild.required(SeriesForm);

  async submitted(series: Partial<Series>) {
    try {
      await this.rcs.addSeries(series);
      this.router.navigate(['/race-calender']);
    } catch (error: any) {
      this.snackbar.open('Error adding Series', 'Close', { duration: 3000 });
    }
  }

  canDeactivate = () => this.form().canDeactivate();
}
