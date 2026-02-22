import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ScoringEngine } from 'app/published-results';
import { Race, RaceCalendarStore } from 'app/race-calender';
import { CurrentRaces, RaceCompetitor, RaceCompetitorStore, sortEntries } from 'app/results-input';
import { RESULT_CODE_DEFINITIONS, ResultCode, getResultCodeDefinition } from 'app/scoring/model/result-code';
import { Toolbar } from 'app/shared/components/toolbar';
import { normaliseString } from 'app/shared/utils/string-utils';
import { differenceInSeconds } from 'date-fns';
import { firstValueFrom, map, startWith } from 'rxjs';
import { DurationPipe } from '../duration.pipe';
import { ManualResultsTable } from '../manual-results-table';
import { RaceStartTimeDialog, RaceStartTimeResult } from '../race-start-time-dialog';
import { RaceTimeInput } from '../race-time-input';

@Component({
  selector: 'app-manual-results-page',
  templateUrl: './manual-results-page.html',
  styleUrls: ['./manual-results-page.scss'],
  imports: [
    Toolbar,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    DatePipe,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    RaceTimeInput,
    ManualResultsTable,
    DurationPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualResultsPage {
  private readonly store = inject(RaceCompetitorStore);
  private readonly dialog = inject(MatDialog);
  protected readonly raceStore = inject(RaceCalendarStore);
  protected readonly currentRacesStore = inject(CurrentRaces);
  private readonly publishService = inject(ScoringEngine);

  readonly raceFilterControl = new FormControl<string | null>(null);

  readonly resultCodes = RESULT_CODE_DEFINITIONS.filter(c => c.id !== 'NOT FINISHED');

  // Form for data entry
  readonly form = new FormGroup({
    competitor: new FormControl<RaceCompetitor | null>(null, Validators.required),
    finishTime: new FormControl<Date | null>(null, { validators: Validators.required, updateOn: 'blur' }),
    laps: new FormControl<number>(1, Validators.required),
    resultCode: new FormControl<ResultCode>('OK', { nonNullable: true }),
  });

  readonly resultCodeValue = toSignal(this.form.controls.resultCode.valueChanges, { initialValue: 'OK' });
  readonly resultCodeDescription = computed(() => getResultCodeDefinition(this.resultCodeValue())?.description);

  readonly selectedCompetitor = signal<RaceCompetitor | undefined>(undefined);

  readonly selectedRaceId = toSignal(this.raceFilterControl.valueChanges);

  readonly selectedRace = computed(() => 
    this.currentRacesStore.selectedRaces().find( r => this.selectedRaceId() ==r.id) );

  // Search control for autocomplete
  readonly searchControl = new FormControl<string | RaceCompetitor | null>('');
  private readonly searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : ''))
    ), { initialValue: '' }
  );

  readonly timeInputContext = computed(() => {
    const race = this.selectedRace();

    if (!race) return { mode: 'tod' as const, baseTime: new Date() };

    const mode = race.timeInputMode || 'tod';

    const baseTime = race.actualStart || new Date();

    return { mode, baseTime: new Date(baseTime) };
  });

  // Feedback signals for the RO
  readonly enteredFinishTime = toSignal(this.form.controls.finishTime.valueChanges, { initialValue: null });
  readonly enteredLapsValue = toSignal(this.form.controls.laps.valueChanges, { initialValue: 1 });

  readonly calculatedStats = computed(() => {
    const finishTime = this.enteredFinishTime();
    const laps = this.enteredLapsValue() || 1;
    const raceStartTime = this.selectedRace()?.actualStart;

    if (!finishTime || !raceStartTime) return null;

    // Both finishTime and raceStartTime are Date objects on the same day.
    const elapsedSeconds = differenceInSeconds(finishTime, raceStartTime);

    if (elapsedSeconds <= 0) return null;

    const avgLapTime = elapsedSeconds / laps;

    // Simple heuristic: Highlight if avg lap < 2 mins (120s) or > 60 mins (3600s)
    // This can be tuned or made configurable per class/race
    const isSuspicious = avgLapTime < 120 || avgLapTime > 3600;

    return { elapsedSeconds, avgLapTime, isSuspicious };
  });

  // Remember the last entered time to pre-populate the next entry
  private readonly lastEnteredLaps = signal<number>(1);

  // Competitors list sorted: Unfinished first, then Finished (at bottom)
  readonly sortedCompetitors = computed(() => {
    const raceId = this.selectedRace()?.id;
    const comps = this.store.selectedCompetitors().filter(comp => raceId === comp.raceId);
    return [...comps].sort((a, b) => manualRaceEntrySort(a, b));
  });

  // Filtered competitors for autocomplete
  readonly autoCompleteCompetitors = computed(() => {
    const term = normaliseString(this.searchTerm());

    return this.sortedCompetitors().filter(c => {
      const searchStr = normaliseString(`${c.boatClass} ${c.sailNumber} ${c.helm}`);
      return searchStr.includes(term);
    });
  });

  constructor() {
    // When a competitor is selected (via table or autocomplete), populate the form and search control
    const selectedCompetitorEffect = effect(() => {
      const comp = this.selectedCompetitor();
      if (comp) {
        this.form.controls.competitor.setValue(comp);
        this.searchControl.setValue(comp, { emitEvent: false });

        if (comp.manualFinishTime) {
          this.form.controls.resultCode.setValue(comp.resultCode);
          this.form.controls.laps.setValue(comp.manualLaps || 1);
          this.form.controls.finishTime.setValue(comp.manualFinishTime);
        } else {
          this.form.controls.laps.setValue(this.lastEnteredLaps());
          this.form.controls.resultCode.setValue('OK');
          this.form.controls.finishTime.setValue(null);
        }
      }
    });

    const startTimePromptEffect = effect(() => {
      const race = this.selectedRace();
      if (race) {
        untracked(() => {
          if (!race.actualStart) {
            this.setStartTime(race);
          }
        });
      }
    });
  }

  displayFn(comp: RaceCompetitor): string {
    return comp ? `${comp.helm} ${comp.boatClass} ${comp.sailNumber}` : '';
  }

  onCompetitorSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedCompetitor.set(event.option.value);
  }

  onRowClick(row: RaceCompetitor) {
    this.selectedCompetitor.set(row);
  }

  async setStartTime(race: Race): Promise<RaceStartTimeResult | undefined> {
    const dialog = this.dialog.open<RaceStartTimeDialog, { race: typeof race; }, RaceStartTimeResult>(RaceStartTimeDialog, {
      data: { race }
    });

    const result = await firstValueFrom<RaceStartTimeResult | undefined>(dialog.afterClosed());

    if (result) {
      await this.raceStore.updateRace(race.seriesId, race.id, {
        actualStart: result.startTime,
        timeInputMode: result.mode
      });
    }

    return result;
  } 
/*
  async setStartTime(race: Race): Promise<RaceStartTimeResult | undefined> {
    const dialog = this.dialog.open<RaceStartTimeDialog, { race: typeof race; }, RaceStartTimeResult>(RaceStartTimeDialog, {
      data: { race }
    });

    const result = await firstValueFrom<RaceStartTimeResult | undefined>(dialog.afterClosed());

    if (result) {
      await this.raceStore.updateRace(race.seriesId, race.id, {
        actualStart: result.startTime,
        timeInputMode: result.mode
      });
    }

    return result;
  } */

  async save() {
    if (this.form.invalid) return;

    const { competitor, finishTime, laps, resultCode } = this.form.getRawValue();
    if (!competitor) return;

    const race = this.currentRacesStore.selectedRaces().find(r => r.id === competitor.raceId);

    // Start time must have been set for the competitor prior 
    // to saving the result. 
    if (!race!.actualStart) {
      console.error('ManualResultsRage: Attempting to save resukt before start time set');
      await this.setStartTime(race!);
      return
    }

    // If Result is OK, a finish time must be provided. 
    // If not OK then it is valid not to have a finish time.
    if (resultCode === 'OK' && !finishTime) {
      console.error('ManualResultsRage: Attempting to save competitor with result code OK and no finish time');
      return;
    }

    await this.store.updateResult(competitor, {
      startTime: race!.actualStart,
      manualFinishTime: finishTime || undefined,  // map null to undefined
      manualLaps: laps || 1,
      resultCode: resultCode
    });

    // Remember laps for next entry
    if (laps) this.lastEnteredLaps.set(laps);

    this.resetForm();

  }

  resetForm() {
    const lastLaps = this.lastEnteredLaps();
    this.form.reset(); // this will set laps to its default of 1
    this.form.controls.laps.setValue(lastLaps); // now set it to the last entered value
    this.searchControl.setValue('');
    this.form.controls.resultCode.setValue('OK');
    this.selectedCompetitor.set(undefined);
  }

  /** Publish the race results */
  publish() {
    if (this.selectedRace()) {
      this.publishService.publishRace(this.selectedRace()!);
    }

  }
}

export function manualRaceEntrySort(a: RaceCompetitor, b: RaceCompetitor): number {
   // A competitor is considered 'finished' for sorting if they have a finish time and an 'OK' result code.
   const aFinished = !!a.finishTime && a.resultCode === 'OK';
   const bFinished = !!b.finishTime && b.resultCode === 'OK';

   // If one is finished and the other isn't, unfinished goes first
   if (aFinished !== bFinished) {
      return aFinished ? 1 : -1;
   }
   // If both finished, sort by corrected time (fastest first) or finish time if no result
   if (aFinished && bFinished && a.elapsedTime && b.elapsedTime) {
      // This is a simplified sort. A full corrected time calculation would be needed here for handicap races.
      // For now, sorting by elapsed time is a reasonable default for the manual entry view.
      return a.elapsedTime - b.elapsedTime;
   }

   // If both unfinished, standard sort (Class/SailNo)
   return sortEntries(a, b);
}