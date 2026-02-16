
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClubService } from 'app/club/@store/club.service';
import { Toolbar } from 'app/shared/components/toolbar';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RaceCalendarStore } from './@store/full-race-calander';
import { Series } from './@store/series';

@Component({
  selector: 'app-series-copy',
  imports: [Toolbar, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-toolbar title="Copy Series" showBack/>
    <form (ngSubmit)="submit()" [formGroup]="form" novalidate>

       <p class=header>
        Copy exsiting series and races <br>
        Specify new series name and fleet
       </p>

      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput formControlName="name">
        <mat-error>Name required</mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Fleet</mat-label>
        <mat-select formControlName="fleetId">
          @for (f of cs.club().fleets; track f.id) {
            <mat-option [value]="f.id">{{f.name}}</mat-option>
          }
        </mat-select>
        <mat-error>Fleet required</mat-error>
      </mat-form-field>

      <div class="actions">
        <button [disabled]="form.invalid || !form.dirty" matButton="tonal" type="submit">
          Copy
        </button>
      </div>
   </form>
  `,
  styles: `
    @use "mixins" as mix;

    @include mix.form-page("form", 350px);

    .header {
      font: var(--mat-sys-title-medium);
    }
  `
})
export class SeriesCopy {

  private rcs = inject(RaceCalendarStore);
  protected cs = inject(ClubService);
  private router = inject(Router);
  private snackbar = inject(MatSnackBar);

  id = input.required<string>(); // Route parameter - series Id

  series = this.rcs.getSeries(this.id);
  races = this.rcs.getSeriesRaces(this.id);

  busy = signal(false);

  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    fleetId: new FormControl('', { validators: [Validators.required] }),
  });

  async submit() {
    try {
      this.busy.set(true);

      const newSeries: Series = {
        ...this.series()!, 
        name: this.form.value.name!, 
        fleetId: this.form.value.fleetId!, 
      }

      const newSeriesId = await this.rcs.addSeries(newSeries);

      const seriesDetails = {
        id: newSeriesId,
        name: this.form.value.name!,
        fleetId: this.form.value.fleetId!
      };

      this.rcs.addRaces(seriesDetails, this.races());

      this.form.reset();

      // Navigate back to the series list
      this.router.navigate(['race-calender', this.id()]);
    } catch (error: any) {
      this.snackbar.open('Error adding Series', 'Close', { duration: 3000 });
    } finally {
      this.busy.set(false);
    }
  }

  canDeactivate = () => !this.form.dirty;
}
