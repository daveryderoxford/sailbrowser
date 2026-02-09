import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClubService } from 'app/club/@store/club.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Race } from '../@store/race';
import { RACE_TYPES } from '../@store/race-type';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-race-details-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatButtonModule, MatCheckboxModule, MatDatepickerModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'race-details-form.html',
  styles: `
    @use "mixins" as mix;

    @include mix.form-page("form", 350px);
  `
})
export class RaceDetailsForm {
  cs = inject(ClubService);

  race = input<Race | undefined>();
  submitted = output<Partial<Race>>();
  deleted = output<Race>();

  form = new FormGroup({
    scheduledStart: new FormControl(new Date(), { validators: [Validators.required] }),
    raceOfDay: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
    type: new FormControl('Conventional', { validators: [Validators.required] }),
    isDiscardable: new FormControl(true, { validators: [Validators.required] }),
    isAverageLap: new FormControl(true, { validators: [Validators.required] }),
  });

  raceTypes = RACE_TYPES;

  constructor() {
    effect(() => {
      if (this.race()) this.form.patchValue(this.race()!);
    });
  }
  submit() {
    this.submitted.emit(this.form.getRawValue() as Partial<Race>);
    this.form.reset();
  }

  canDeactivate = () => !this.form.dirty;
}
