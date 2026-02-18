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
import { SeriesScoringSchemeDetails, SeriesEntryAlgorithmDetails, defaultSeriesScoringData } from 'app/race-calender/@store/series-scoring-data';
import { SubmitButton } from "app/shared/components/submit-button";
import { MatDivider } from "@angular/material/divider";

@Component({
  selector: 'app-series-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, SubmitButton, MatDivider],
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

      <mat-divider/>
      
      <h3>Scoring Algorithm</h3>

      <div formGroupName="scoringScheme" class="form-group-section">
        <mat-form-field>
          <mat-label>Scoring Scheme</mat-label>
          <mat-select formControlName="scheme">
            @for (s of seriesScoringSchemes; track s.name) {
              <mat-option [value]="s.name">{{s.displayName}}</mat-option>
            }
          </mat-select>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Entry Algorithm</mat-label>
          <mat-select formControlName="entryAlgorithm">
            @for (a of seriesEntryAlgorithms; track a.name) {
              <mat-option [value]="a.name">{{a.displayName}}</mat-option>
            }
          </mat-select>
          <mat-hint>Select how entries are grouped</mat-hint>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Initial discard after</mat-label>
          <input matInput type="number" formControlName="initialDiscardAfter">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Subsequent discards every</mat-label>
          <input matInput type="number" formControlName="subsequentDiscardsEveryN">
        </mat-form-field>
      </div>

      <div class="actions">

        <app-submit-button [disabled]="form.invalid || !form.dirty" [busy]="busy()">
          Save
        </app-submit-button>
      </div>
    </form>
  `,
  styles: `
    @use "mixins" as mix;

    @include mix.form-page("form", 400px);

    .form-group-section {
      display: contents;
    }

  `
})
export class SeriesForm {
  cs = inject(ClubService);
  
  seriesScoringSchemes = SeriesScoringSchemeDetails;
  seriesEntryAlgorithms = SeriesEntryAlgorithmDetails;

  series = input<Series | undefined>();
  busy = input(false);
  submitted = output<Partial<Series>>();

  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    season: new FormControl('', { validators: [Validators.required] }),
    fleetId: new FormControl('', { validators: [Validators.required] }),
    startDate: new FormControl<Date | null>(null),
    endDate: new FormControl<Date | null>(null),
    scoringScheme: new FormGroup({
      scheme: new FormControl(defaultSeriesScoringData.scheme, { nonNullable: true, validators: [Validators.required] }),
      entryAlgorithm: new FormControl(defaultSeriesScoringData.entryAlgorithm, { nonNullable: true, validators: [Validators.required] }),
      initialDiscardAfter: new FormControl(defaultSeriesScoringData.initialDiscardAfter, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
      subsequentDiscardsEveryN: new FormControl(defaultSeriesScoringData.subsequentDiscardsEveryN, { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    }),
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
 
