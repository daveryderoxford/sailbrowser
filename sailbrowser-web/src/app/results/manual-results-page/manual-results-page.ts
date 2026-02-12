import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RaceCalendarStore } from 'app/race-calender/@store/full-race-calander';
import { RaceCompetitor, ResultData } from 'app/race/@store/race-competitor';
import { RaceCompetitorStore, sortEntries } from 'app/race/@store/race-competitor-store';
import { ResultCode, ResultCodeDefinitions } from 'app/race/@store/result-code';
import { CurrentRaces } from 'app/race/@store/current-races-store';
import { Toolbar } from 'app/shared/components/toolbar';
import { map, startWith } from 'rxjs';
import { RaceStartTimeDialog, RaceStartTimeResult } from '../race-start-time-dialog';
import { RaceScorer } from '../scoring/race-scorer';
import { RaceTimeInput } from './race-time-input';
import { ManualResultsTable } from './manual-results-table';
import { differenceInSeconds } from 'date-fns';

@Component({
  selector: 'app-manual-results-page',
  templateUrl: './manual-results-page.html',
  styleUrls: ['./manual-results-page.scss'],
  imports: [
    Toolbar,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    DatePipe,
    MatButtonToggleModule,
    MatIconModule,
    MatSelectModule,
    MatDialogModule,
    RaceTimeInput,
    ManualResultsTable,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualResultsPage {
  private readonly store = inject(RaceCompetitorStore);
  private readonly dialog = inject(MatDialog);
  protected readonly raceStore = inject(RaceCalendarStore);
  protected readonly currentRacesStore = inject(CurrentRaces);
  private readonly raceScorer = inject(RaceScorer);

  readonly raceFilterControl = new FormControl<string | null>(null);

  readonly resultCodes = Object.values(ResultCodeDefinitions).sort((a, b) => a.displayName.localeCompare(b.displayName));

  // Form for data entry
  readonly form = new FormGroup({
    competitor: new FormControl<RaceCompetitor | null>(null, Validators.required),
    finishTime: new FormControl<Date | null>(null, { validators: Validators.required, updateOn: 'blur' }),
    laps: new FormControl<number>(1, Validators.required),
    resultCode: new FormControl<ResultCode>(ResultCode.Ok, { nonNullable: true }),
  });

  readonly resultCodeValue = toSignal(this.form.controls.resultCode.valueChanges, { initialValue: ResultCode.Ok });
  readonly resultCodeDescription = computed(() => ResultCodeDefinitions[this.resultCodeValue()]?.description);

  readonly selectedCompetitor = signal<RaceCompetitor | null>(null);

  // Search control for autocomplete
  readonly searchControl = new FormControl<string | RaceCompetitor | null>('');
  private readonly searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : ''))
    ), { initialValue: '' }
  );

  protected readonly resultsRaceIds = toSignal(
    this.raceFilterControl.valueChanges.pipe(map(val => val ? [val] : [])), 
    { initialValue: [] }
  );

  readonly selectedRace = computed(() => {
    const ids = this.resultsRaceIds();
    return ids.length === 1 ? this.currentRacesStore.selectedRaces().find(r => r.id === ids[0]) : undefined;
  });

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
    const competitor = this.selectedCompetitor();
    const race = this.selectedRace();
 
    if (!finishTime || !competitor || !race) return null;

    const startTime = race.actualStart ?? new Date();
    
    const elapsedSeconds = differenceInSeconds(finishTime, startTime);

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
    const raceIds = this.resultsRaceIds();
    const comps = this.store.selectedCompetitors().filter( comp => raceIds.includes(comp.raceId));
    return [...comps].sort((a, b) => {
      const aFinished = !!a.manualFinishTime;
      const bFinished = !!b.manualFinishTime;

      // If one is finished and the other isn't, unfinished goes first
      if (aFinished !== bFinished) {
        return aFinished ? 1 : -1;
      }

      // If both finished, sort by corrected time (fastest first) or finish time if no result
      if (aFinished) {
        const aTime = a.result?.correctedTime ?? a.manualFinishTime?.getTime() ?? 0;
        const bTime = b.result?.correctedTime ?? b.manualFinishTime?.getTime() ?? 0;
        return aTime - bTime;
      }

      // If both unfinished, standard sort (Class/SailNo)
      return sortEntries(a, b);
    });
  });

  // Filtered competitors for autocomplete
  readonly filteredCompetitors = computed(() => {
    const term = this.searchTerm()?.toLowerCase() || '';
    return this.sortedCompetitors().filter(c => {
      const searchStr = `${c.boatClass} ${c.sailNumber} ${c.helm}`.toLowerCase();
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
          this.form.controls.resultCode.setValue(ResultCode.Ok);
          this.form.controls.finishTime.setValue(null);
        }
      }
    });

    // Update validators based on result code
    // If results codes is not OK then time is not mandatory
    const resultCodeValidatorEffect = effect(() => {
      const code = this.resultCodeValue();
      if (code === ResultCode.Ok) {
        this.form.controls.finishTime.setValidators(Validators.required);
      } else {
        this.form.controls.finishTime.clearValidators();
      }
      this.form.controls.finishTime.updateValueAndValidity();
    });

    // Auto-prompt for start time if a single race is selected and has no start time
    const startTimePromptEffect = effect(() => {
      const selectedIds = this.resultsRaceIds();
      if (selectedIds.length === 1) {
        const raceId = selectedIds[0];
        const race = this.currentRacesStore.selectedRaces().find(r => r.id === raceId);
        if (race) {
        untracked(() => {
          if (!race.actualStart) {
            this.setStartTime();
          }
        });
        }
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

  setStartTime() {
    const selectedIds = this.resultsRaceIds();
    if (selectedIds.length !== 1) return;
    const raceId = selectedIds[0];
    const race = this.currentRacesStore.selectedRaces().find(r => r.id === raceId);
    if (!race) return;

    this.dialog.open<RaceStartTimeDialog, { race: typeof race }, RaceStartTimeResult>(RaceStartTimeDialog, {
      data: { race }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.raceStore.updateRace(race.seriesId, race.id, {
          actualStart: result.startTime,
          timeInputMode: result.mode
        });
      }
    });
  }

  async save() {
    if (this.form.invalid) return;

    const { competitor, finishTime, laps, resultCode } = this.form.getRawValue();
    if (!competitor) return;

    const race = this.currentRacesStore.selectedRaces().find(r => r.id === competitor.raceId);
    const finishDate = finishTime || undefined;

    // If Result is OK, we expect a finish date. If not OK, we proceed without one.
    if (finishDate || resultCode !== ResultCode.Ok) {
      
      // Check if data actually changed to avoid unnecessary writes
      if (competitor.manualFinishTime?.getTime() === finishDate?.getTime() &&
          competitor.manualLaps === laps &&
          competitor.resultCode === resultCode) {
            this.resetForm();
            return;
      }

      // Calculate result data (corrected time) for sorting
      let resultData: ResultData | undefined;

      if (race && finishDate && resultCode === ResultCode.Ok) {
        // TODO:  Decide we we display avaerge lap time or scakled by maxlaps We need the max laps to calculate corrected time for average lap races
        // We use the current store state, but override the current competitor's laps
        const competitors = this.store.selectedCompetitors().filter(c => c.raceId === race.id);
        const currentLaps = laps || 1;

        // Calculate max laps including this update
        let maxLaps = currentLaps;
   /*     if (race.isAverageLap) {
          maxLaps = competitors.reduce((max, c) => {
            const cLaps = c.id === competitor.id ? currentLaps : (c.manualLaps || c.lapTimes.length || 0);
            return Math.max(max, cLaps);
          }, 0);
        } */

        const times = this.raceScorer.calculateResultTimes({
          comp: { ...competitor, manualFinishTime: finishDate, manualLaps: currentLaps } as RaceCompetitor,
          scheme: (race as any).handicapScheme || 'PY',
          isAverageLap: race.isAverageLap,
          startTime: competitor.startTime || (race.actualStart ? new Date(race.actualStart) : new Date(race.scheduledStart)),
        });

        resultData = {
          elapsedTime: times.elapsed,
          correctedTime: times.corrected,
          position: 0, // Placeholder, requires full fleet scoring
          points: 0,   // Placeholder
          isDiscarded: false,
          isDiscardable: true
        };
      }

      // Optimistic update / Local calculation could happen here, but we rely on the store update for now.
      await this.store.updateResult({
        seriesId: competitor.seriesId,
        raceId: competitor.raceId,
        id: competitor.id
      }, {
        manualFinishTime: finishDate,
        manualLaps: laps || 1,
        resultCode: resultCode,
        ...(resultData ? { result: resultData } : {})
      });

      // Trigger a recalculation of results for this race to update positions immediately
      // This assumes the backend or a separate process might also do this, but doing it here updates the UI
      if (race) {
        const raceCompetitors = this.store.selectedCompetitors().filter(c => c.raceId === race.id);
        // We need to re-fetch or use the updated list. Since store updates are async, 
        // we might need to wait or rely on the subscription. 
        // For now, the sortedCompetitors computed will handle the sorting once the store emits.
      }

      // Remember laps for next entry
      if (laps) this.lastEnteredLaps.set(laps);
      
      // Reset for next entry
      this.resetForm();
    }
  }

  private getRaceStartTime(raceId: string): Date | undefined {
    const race = this.currentRacesStore.selectedRaces().find(r => r.id === raceId);
    if (!race) return undefined;
    return race.actualStart ? new Date(race.actualStart) : new Date(race.scheduledStart);
  }

  resetForm() {
    const lastLaps = this.lastEnteredLaps();
    this.form.reset(); // this will set laps to its default of 1
    this.form.controls.laps.setValue(lastLaps); // now set it to the last entered value
    this.searchControl.setValue('');
    this.form.controls.resultCode.setValue(ResultCode.Ok);
    this.selectedCompetitor.set(null);
  }
}