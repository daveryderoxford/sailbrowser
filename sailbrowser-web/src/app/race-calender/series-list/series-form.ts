import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClubService } from 'app/club/@store/club.service';
import { Series } from '../@store/series';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-series-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatCheckboxModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <form (ngSubmit)="submit()" [formGroup]="form" novalidate>
      <mat-form-field>
        <mat-label>Name</mat-label>
        <input matInput formControlName="name">
        <mat-error>Name required</mat-error>
      </mat-form-field>

      <mat-form-field>
        <mat-label>Season</mat-label>
        <input matInput formControlName="season">
        <mat-error>Season required</mat-error>
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

      <mat-form-field>
        <mat-label>Start Date</mat-label>
        <input matInput [matDatepicker]="startPicker" formControlName="startDate">
        <mat-datepicker-toggle matIconSuffix [for]="startPicker"></mat-datepicker-toggle>
        <mat-datepicker #startPicker></mat-datepicker>
      </mat-form-field>

      <mat-form-field>
        <mat-label>End Date</mat-label>
        <input matInput [matDatepicker]="endPicker" formControlName="endDate">
        <mat-datepicker-toggle matIconSuffix [for]="endPicker"></mat-datepicker-toggle>
        <mat-datepicker #endPicker></mat-datepicker>
      </mat-form-field>

      <div class="actions">
        <button [disabled]="form.invalid || !form.dirty" matButton="tonal" type="submit">
          Save
        </button>
      </div>
    </form>
  `,
  styles: `
    @use "mixins" as mix;

    @include mix.form-page("form", 350px);
  `
})
export class SeriesForm {
  cs = inject(ClubService);

  series = input<Series | undefined>();
  submitted = output<Partial<Series>>();

  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    season: new FormControl('', { validators: [Validators.required] }),
    fleetId: new FormControl('', { validators: [Validators.required] }),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
  });

  constructor() {
    effect(() => {
      if (this.series()) {
        this.form.patchValue(this.series()!);
      }
    });
  }

  submit() {
    this.submitted.emit(this.form.getRawValue() as Partial<Series>);
    this.form.reset();
  }

  public canDeactivate(): boolean {
    return !this.form.dirty;
  }

}

