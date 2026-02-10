import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RaceCalendarStore } from 'app/race-calender/@store/full-race-calander';
import { RaceCompetitor } from 'app/race/@store/race-competitor';
import { RaceCompetitorStore, sortEntries } from 'app/race/@store/race-competitor-store';
import { ResultCode, ResultCodeDefinitions } from 'app/race/@store/result-code';
import { CurrentRaces } from 'app/race/@store/current-races-store';
import { Toolbar } from 'app/shared/components/toolbar';
import { map, startWith } from 'rxjs';

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
    MatSelectModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualResultsPage {
  private readonly store = inject(RaceCompetitorStore);
  protected readonly raceStore = inject(RaceCalendarStore);
  protected readonly currentRacesStore = inject(CurrentRaces);

  readonly timeTypeControl = new FormControl<'tod' | 'elapsed'>('tod', { nonNullable: true });
  readonly raceFilterControl = new FormControl<string[]>([], { nonNullable: true });

  readonly resultCodes = Object.values(ResultCodeDefinitions).sort((a, b) => a.displayName.localeCompare(b.displayName));

  // Form for data entry
  readonly form = new FormGroup({
    competitor: new FormControl<RaceCompetitor | null>(null, Validators.required),
    time: new FormControl<string>('', Validators.required),
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

  private reaultsRaceIds = toSignal(this.raceFilterControl.valueChanges, 
    {initialValue: []});

  // Remember the last entered time to pre-populate the next entry
  private readonly lastEnteredTime = signal<string>('');

  // Competitors list sorted: Unfinished first, then Finished (at bottom)
  readonly sortedCompetitors = computed(() => {
    const raceIds = this.reaultsRaceIds();
    const comps = this.store.selectedCompetitors().filter( comp => raceIds.includes(comp.raceId));
    return [...comps].sort((a, b) => {
      const aFinished = !!a.manualFinishTime;
      const bFinished = !!b.manualFinishTime;

      // If one is finished and the other isn't, unfinished goes first
      if (aFinished !== bFinished) {
        return aFinished ? 1 : -1;
      }

      // If both finished, sort by finish time (latest last)
      if (aFinished) {
        return (a.manualFinishTime?.getTime() ?? 0) - (b.manualFinishTime?.getTime() ?? 0);
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

  readonly displayedColumns = ['helm', 'boatClass', 'sailNumber', 'finishTime', 'laps'];

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

          const timeType = this.timeTypeControl.value;
          const finishTime = comp.manualFinishTime;

          if (timeType === 'tod') {
            const hours = finishTime.getHours().toString().padStart(2, '0');
            const minutes = finishTime.getMinutes().toString().padStart(2, '0');
            const seconds = finishTime.getSeconds().toString().padStart(2, '0');
            this.form.controls.time.setValue(`${hours}:${minutes}:${seconds}`);
          } else {
            const race = this.currentRacesStore.selectedRaces().find(r => r.id === comp.raceId);
            const startTime = comp.startTime || (race ? new Date(race.scheduledStart) : undefined);
            
            if (startTime && !isNaN(startTime.getTime())) {
              const diff = Math.max(0, finishTime.getTime() - startTime.getTime());
              const totalSeconds = Math.floor(diff / 1000);
              const h = Math.floor(totalSeconds / 3600);
              const m = Math.floor((totalSeconds % 3600) / 60);
              const s = totalSeconds % 60;
              
              if (h > 0) {
                this.form.controls.time.setValue(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
              } else {
                this.form.controls.time.setValue(`${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
              }
            } else {
              this.form.controls.time.setValue('');
            }
          }
        } else {
          this.form.controls.laps.setValue(comp.manualLaps || 1);
          this.form.controls.resultCode.setValue(ResultCode.Ok);
          this.form.controls.time.setValue(this.lastEnteredTime() || '');
        }
      }
    });

    // Update validators based on result code
    effect(() => {
      const code = this.resultCodeValue();
      if (code === ResultCode.Ok) {
        this.form.controls.time.setValidators(Validators.required);
      } else {
        this.form.controls.time.clearValidators();
      }
      this.form.controls.time.updateValueAndValidity();
    });
  }

  displayFn(comp: RaceCompetitor): string {
    return comp ? `${comp.helm} ${comp.boatClass} ${comp.sailNumber}` : '';
  }

  onCompetitorSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedCompetitor.set(event.option.value);
  }

  onRowClick(row: RaceCompetitor) {
    // Prevent switching if in the middle of data entry (form is dirty)
    if (this.form.dirty && this.selectedCompetitor()?.id !== row.id) {
      return;
    }
    this.selectedCompetitor.set(row);
    this.form.markAsPristine();
  }

  async save() {
    if (this.form.invalid) return;

    const { competitor, time, laps, resultCode } = this.form.getRawValue();
    const timeType = this.timeTypeControl.value;
    if (!competitor) return;

    let finishDate: Date | undefined;

    if (timeType === 'tod') {
      // Time of Day: Combine Race Date with entered Time
      const race = this.currentRacesStore.selectedRaces().find(r => r.id === competitor.raceId);
      if (race) {
        const dateStr = new Date(race.scheduledStart).toDateString();
        finishDate = new Date(`${dateStr} ${time}`);
      }
    } else if (time) {
      // Elapsed: Start Time + Duration
      // Parse MM:SS or HH:MM:SS
      const parts = time.split(':').map(Number);
      let seconds = 0;
      if (parts.length === 3) seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
      else if (parts.length === 2) seconds = parts[0] * 60 + parts[1];
      else seconds = parts[0];

      // Use competitor start time or race start time
      const startTime = competitor.startTime || 
        (competitor.raceId ? new Date(this.currentRacesStore.selectedRaces().find(r => r.id === competitor.raceId)?.scheduledStart!) : undefined);

      if (startTime) {
        finishDate = new Date(startTime.getTime() + seconds * 1000);
      }
    }

    // If Result is OK, we expect a finish date. If not OK, we proceed without one.
    if (finishDate || resultCode !== ResultCode.Ok) {
      await this.store.updateResult({
        seriesId: competitor.seriesId,
        raceId: competitor.raceId,
        id: competitor.id
      }, {
        manualFinishTime: finishDate,
        manualLaps: laps || 1,
        resultCode: resultCode
      });

      // Remember time for next entry
      if (time) this.lastEnteredTime.set(time);
      
      // Reset for next entry
      this.resetForm();
    }
  }

  resetForm() {
    this.form.controls.competitor.reset();
    this.searchControl.setValue('');
    this.form.controls.resultCode.setValue(ResultCode.Ok);
    this.selectedCompetitor.set(null);
    // Keep the time and laps as is, or reset? 
    // Requirement: "remembering the time from the previous entry"
    // So we keep 'time' in the form control or re-set it from lastEnteredTime on next selection.
    // We'll clear the competitor selection to allow searching for the next one.
  }
}