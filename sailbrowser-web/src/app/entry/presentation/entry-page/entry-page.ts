import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatStepperModule } from '@angular/material/stepper';
import { debounceTime, map, startWith } from 'rxjs';
import { Race } from '../../../race-calender/model/race';
import { EntryService } from '../../services/entry.service';
import { Toolbar } from "app/shared/components/toolbar";
import { MatSelectModule } from '@angular/material/select';
import { CurrentRaces } from '../../../results-input/services/current-races-store';
import { Router } from '@angular/router';
import { BoatsStore, boatFilter } from '../../../boats/services/boats.store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIcon } from "@angular/material/icon";
import { BusyButton } from "app/shared/components/busy-button";
import { ClubService } from 'app/club';
import { Boat } from 'app/boats';

@Component({
  selector: 'app-entry',
  imports: [
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    DatePipe,
    MatAutocompleteModule,
    Toolbar,
    MatSelectModule,
    MatCheckboxModule,
    MatIcon,
    BusyButton
],
  templateUrl: 'entry-page.html',
  styles: [`
    @use "mixins" as mix;

    @include mix.centered-column-page(".content", 480px);

    .actions {
      margin-top: 5px;
      margin-right: 10px;
      display: flex;
      justify-content: end;
      gap: 12px;
    }
    mat-form-field {
      display: block;
      margin-bottom: 8px;
    }
    .boat-selection {
      display: flex;
      align-items: baseline;
      gap: 5px;
      margin-top: 10px;
    }
    .search-field {
      flex-grow: 1;
    }
    .placeholder {
      padding: 15px;
      text-align: center;
      font: var(--mat-sys-body-large);
    }
    .save-boat-cb {
      display: block;
      margin-bottom: 15px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntryPage {
  private readonly formBuilder = inject(FormBuilder);
  private readonly _entryService = inject(EntryService);
  private readonly bs = inject(BoatsStore);
  protected readonly cs = inject(ClubService);
  protected readonly currentRacesStore = inject(CurrentRaces);
  private readonly router = inject(Router);
  private readonly snackbar = inject(MatSnackBar);

  selectedBoat = signal<any>(null);
  isNewBoat = signal(false);

  busy = signal(false);

  showForm = computed(() => !!this.selectedBoat() || this.isNewBoat());

  constructor() {
    effect(() => {
      const boat = this.selectedBoat();
      const isNew = this.isNewBoat();

      if (isNew) {
        this.competitorDetailsGroup.enable();
        this.competitorDetailsGroup.reset();
        this.boatSearchControl.setValue('');
      } else if (boat) {
        this.competitorDetailsGroup.patchValue({
          boatClass: boat.boatClass,
          sailNumber: boat.sailNumber,
          helm: boat.helm,
          crew: boat.crew,
          handicap: boat.handicap
        });

        this.competitorDetailsGroup.controls.boatClass.disable();
        this.competitorDetailsGroup.controls.sailNumber.disable();
        this.competitorDetailsGroup.controls.handicap.disable();

        if (boat.isClub) {
          this.competitorDetailsGroup.controls.helm.enable();
        } else {
          this.competitorDetailsGroup.controls.helm.disable();
        }
      }
    });
  }

  readonly boatSearchControl = new FormControl('');

  private readonly searchTerm = toSignal(
    this.boatSearchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(150),
      map(value => (typeof value === 'string' ? value : ''))
    ), { initialValue: '' }
  );

  readonly filteredBoats = computed(() =>
    this.bs.boats().filter(boat => boatFilter(boat, this.searchTerm()))
  );

  todaysRaces = this.currentRacesStore.selectedRaces;

  readonly raceSelectionGroup = this.formBuilder.group({
    enteredRaces: [[] as Race[], Validators.required],
  });

  readonly competitorDetailsGroup = this.formBuilder.group({
    boatClass: ['', Validators.required],
    sailNumber: [null as number | null, Validators.required],
    helm: ['', Validators.required],
    crew: [''],
    handicap: [null as number | null],
    saveBoat: [false],
  });

  displayBoatFn(boat: any): string {
    if (!boat) {
      return "";
    } else if (boat.isClub) {
      return `Club ${boat.boatClass}  ${boat.sailNumber}`;
    } else {
      return `${boat.boatClass}  ${boat.sailNumber}  (${boat.helm})`;
    }
  }

  onBoatSelected(event: MatAutocompleteSelectedEvent) {
    this.isNewBoat.set(false);
    this.selectedBoat.set(event.option.value);
  }

  createNewBoat() {
    this.selectedBoat.set(null);
    this.isNewBoat.set(true);
  }

  async onSubmit() {

    console.log("OnoSubmit triggered");
    if (this.raceSelectionGroup.invalid || this.competitorDetailsGroup.invalid) return;

    const races = this.raceSelectionGroup.value.enteredRaces as Race[];
    const details = this.competitorDetailsGroup.getRawValue();

    if (this.isNewBoat() && details.saveBoat) {
      await this.saveNewBoat(details as Partial<Boat>)
    }

    const entryData = {
      races,
      boatClass: details.boatClass!,
      sailNumber: details.sailNumber!,
      helm: details.helm!,
      crew: details.crew || undefined,
      handicap: details.handicap || undefined,
    };

    if (this._entryService.isDuplicateEntry(entryData)) {
      this.snackbar.open("Duplicate entry for race", "Dismiss", { duration: 3000 });
      return;
    }

    try {
      this.busy.set(true);
      await this._entryService.enterRaces(entryData);
    } catch (error: any) {
      this.snackbar.open("Error encountered adding entries", "Dismiss", { duration: 3000 });
      console.log('EntryPage:  Error adding entris: ' + error.toString());
    } finally {
      this.busy.set(false);
    }

    this.raceSelectionGroup.reset();
    this.competitorDetailsGroup.reset();
    this.selectedBoat.set(null);

    this.router.navigate(['entry', 'entries']);
  }

  public canDeactivate(): boolean {
    return !this.raceSelectionGroup.dirty && !this.competitorDetailsGroup.dirty;
  }

  async saveNewBoat(details: Partial<Boat>) {
    const newBoat = {
      boatClass: details.boatClass!,
      sailNumber: details.sailNumber!,
      helm: details.helm!,
      crew: details.crew || '',
      name: '',
      isClub: false,
    };

    try {
      this.busy.set(true);
      await this.bs.add(newBoat);
    } catch (error: any) {
      this.snackbar.open("Error encountered adding new boat", "Dismiss", { duration: 3000 });
      console.log('EntryPage.  Error adding new boat: ' + error.toString());
    } finally {
      this.busy.set(false);
    }
  }
}