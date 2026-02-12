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
import { Race } from '../race-calender/@store/race';
import { EntryService } from './@store/entry.service';
import { Toolbar } from "app/shared/components/toolbar";
import { ClubService } from 'app/club/@store/club.service';
import { MatSelectModule } from '@angular/material/select';
import { CurrentRaces } from 'app/race/@store/current-races-store';
import { Router } from '@angular/router';
import { BoatsStore, boatFilter } from 'app/boats/@store/boats.store';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    MatSelectModule
  ],
  template: `
    <app-toolbar title="Enter"></app-toolbar>
    <mat-stepper class="content" orientation="horizontal" [linear]="true" #stepper>
      <mat-step [stepControl]="raceSelectionGroup">
        <form [formGroup]="raceSelectionGroup">
          <ng-template matStepLabel>Races</ng-template>

          @if (todaysRaces().length > 0) {
            <mat-selection-list formControlName="enteredRaces">
              @for (race of todaysRaces(); track race.id) {
                <mat-list-option [value]="race">
                  <span matListItemTitle>{{ race.seriesName }} - Race {{ race.raceOfDay }}</span>
                  <span matListItemLine>{{ race.scheduledStart | date:'shortTime' }}</span>
                </mat-list-option>
              }
            </mat-selection-list>
          } @else {
            <p>No races found for today.</p>
          }

          <div class="actions">
            <button matButton="tonal" matStepperNext [disabled]="raceSelectionGroup.invalid">Next</button>
          </div>
        </form>
      </mat-step>

      <mat-step [stepControl]="competitorDetailsGroup">
        <form [formGroup]="competitorDetailsGroup">
          <ng-template matStepLabel>Details</ng-template>

          <div class="boat-selection">
            <mat-form-field appearance="outline" class="search-field">
              <mat-label>Search For Boat</mat-label>
              <input matInput [formControl]="boatSearchControl" [matAutocomplete]="auto" placeholder="Class, Helm or Sail No">
              <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayBoatFn" (optionSelected)="onBoatSelected($event)">
                @for (boat of filteredBoats(); track boat.id) {
                  <mat-option [value]="boat">
                    @if (boat.isClub) {
                      Club {{ boat.boatClass }} {{ boat.sailNumber }}
                    } @else {
                      {{ boat.boatClass }}  {{ boat.sailNumber }} - ({{ boat.helm }})
                    }
    
                  </mat-option>
                }
              </mat-autocomplete>
            </mat-form-field>
            <button matButton="tonal" type="button" class="dense-button" (click)="createNewBoat()">New Boat</button>
          </div>

          @if (showForm()) {

          <mat-form-field>
            <mat-label>Helm Name</mat-label>
            <input matInput formControlName="helm" placeholder="Helm Name">
          </mat-form-field>

          <mat-form-field>
            <mat-label>Crew Name</mat-label>
            <input matInput formControlName="crew" placeholder="Crew Name (Optional)">
          </mat-form-field>
     
           <mat-form-field>
            <mat-label>Class</mat-label>
            <mat-select formControlName="boatClass">
              @for (c of cs.club().classes; track c.name) {
                <mat-option [value]="c.name">{{c.name}}</mat-option>
              }
            </mat-select>
            <mat-error>Boat class required</mat-error>
          </mat-form-field>

          <mat-form-field>
            <mat-label>Sail Number</mat-label>
            <input matInput type="number" formControlName="sailNumber" placeholder="e.g. 12345">
          </mat-form-field>

          <mat-form-field>
            <mat-label>Handicap</mat-label>
            <input matInput type="number" formControlName="handicap" placeholder="Handicap (Optional)">
          </mat-form-field>
          } @else {
            <div class="placeholder"><p>
              <b>Search for boat</b> <br>Enter class, helm or sail number to search
            </p>
            <p>
              press <b>New Boat</b><br>to enter new details
            </p>
          </div>
          }

          <div class="actions">
            <button matButton="outlined" matStepperPrevious>Back</button>
            @if (showForm()) {
            <button matButton="filled" (click)="onSubmit()" [disabled]="competitorDetailsGroup.invalid">Enter</button>
            }
          </div>
        </form>
      </mat-step>
    </mat-stepper>
  `,
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
    if (this.raceSelectionGroup.invalid || this.competitorDetailsGroup.invalid) return;

    const races = this.raceSelectionGroup.value.enteredRaces as Race[];
    const details = this.competitorDetailsGroup.getRawValue();

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

    await this._entryService.enterRaces(entryData);

    this.raceSelectionGroup.reset();
    this.competitorDetailsGroup.reset();
    this.selectedBoat.set(null);
    this.router.navigate(['entry', 'entries']);
  }

  public canDeactivate(): boolean {
    return !this.raceSelectionGroup.dirty && !this.competitorDetailsGroup.dirty;
  }
}