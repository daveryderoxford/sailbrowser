import { ChangeDetectionStrategy, Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RACE_TYPES } from '../@store/race-type';
import { Toolbar } from "app/shared/components/toolbar";
import { RaceCalendarStore } from '../@store/full-race-calander';
import { Race } from '../@store/race';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubmitButton } from "app/shared/components/submit-button";

@Component({
  selector: 'app-race-edit',
  templateUrl: 'race-edit.html',
  styles: [`
    @use "mixins" as mix;
    @include mix.form-page("form", 350px);

    mat-form-field, mat-checkbox {
      display: block;
      margin-bottom: 16px;
    }
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatCheckboxModule, MatButtonModule, MatSelectModule, Toolbar, SubmitButton],
})
export class RaceEdit {
  private readonly fb = inject(FormBuilder);
  private rcs = inject(RaceCalendarStore);
  private readonly router = inject(Router);
  private snackbar = inject(MatSnackBar);

  raceId = input.required<string>();
  race = this.rcs.getRace(this.raceId);

  raceTypes = RACE_TYPES;

  busy = signal(false);

  form = this.fb.group({
    type: ['Convertional', Validators.required],
    isDiscardable: [true, Validators.required],
    isAverageLap: [true, Validators.required],
  });

  constructor() {
    effect(() => {
      if (this.race()) this.form.patchValue(this.race()!);
    });
  }

  async submit() {
    if (this.form.valid) {
      const race = this.race()!;
      const update = this.form.getRawValue() as Partial<Race>;

      try {
        this.busy.set(true);
        await this.rcs.updateRace(race.seriesId, race.id, update);
        this.form.reset();
        this.router.navigate(['/race-calender/series-details/', race.seriesId]);
      } catch (error: any) {
        this.snackbar.open("Error encountered adding races", "Dismiss", { duration: 3000 });
        console.log('AddRace: Error adding races ' + error.toString());
      } finally {
        this.busy.set(false);
      }
    }
  }

  canDeactivate = () => !this.form.dirty;

}
