import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Race } from 'app/race-calender/@store/race';

export interface RaceStartTimeResult {
  mode: 'tod' | 'elapsed';
  startTime: Date;
}

@Component({
  selector: 'app-race-start-time-dialog',
  template: `
    <h2 mat-dialog-title>Set Race Start Time</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="dialog-form">
        <p>Select the timing method used for this race:</p>
        <mat-radio-group formControlName="mode" class="radio-group">
          <mat-radio-button value="tod">Time of Day (Real Time)</mat-radio-button>
          <mat-radio-button value="elapsed">Stopwatch (Elapsed)</mat-radio-button>
        </mat-radio-group>

        <mat-form-field appearance="outline">
          <mat-label>{{ form.value.mode === 'tod' ? 'Start Time (HH:mm:ss)' : 'Stopwatch Reading at Start (mm:ss)' }}</mat-label>
          <input matInput type="time" step="1" formControlName="time">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-flat-button color="primary" [disabled]="form.invalid" (click)="save()">Set Start Time</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .dialog-form { display: flex; flex-direction: column; gap: 16px; min-width: 350px; }
    .radio-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 8px; }
  `],
  imports: [MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatRadioModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RaceStartTimeDialog {
  private dialogRef = inject(MatDialogRef<RaceStartTimeDialog>);
  private data = inject<{ race: Race }>(MAT_DIALOG_DATA);

  readonly form = new FormGroup({
    mode: new FormControl<'tod' | 'elapsed'>(this.data.race.timeInputMode || 'tod', { nonNullable: true }),
    time: new FormControl<string>('', Validators.required),
  });

  constructor() {
    if (this.form.controls.mode.value === 'elapsed') {
      this.form.controls.time.setValue('00:00:00');
    }

    this.form.controls.mode.valueChanges.pipe(takeUntilDestroyed()).subscribe(mode => {
      if (mode === 'elapsed' && !this.form.controls.time.value) {
        this.form.controls.time.setValue('00:00:00');
      }
    });
  }

  save() {
    if (this.form.invalid) return;
    const { mode, time } = this.form.getRawValue();
    
    // Construct the start date based on the race scheduled date + entered time
    const dateStr = new Date(this.data.race.scheduledStart).toDateString();
    // If stopwatch mode (elapsed), we still use the race date as the base, 
    // effectively setting the "zero" point or the specific start time on that day.
    const startTime = new Date(`${dateStr} ${time}`);

    this.dialogRef.close({ mode, startTime } as RaceStartTimeResult);
  }
}