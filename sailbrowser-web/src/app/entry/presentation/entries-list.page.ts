import { ChangeDetectionStrategy, Component, computed, inject, Injector, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { Toolbar } from 'app/shared/components/toolbar';
import { RaceCompetitorStore } from '../../results-input/services/race-competitor-store';
import { CurrentRaces } from '../../results-input/services/current-races-store';
import { RaceCalendarStore } from '../../race-calender/services/full-race-calander';
import { LoadingCentered } from 'app/shared/components/loading-centered';
import { toSignal } from '@angular/core/rxjs-interop';
import { RaceCompetitor } from '../../results-input/model/race-competitor';
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import {  MatIconModule } from "@angular/material/icon";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClubService } from 'app/club';
import { DialogsService } from 'app/shared/dialogs/dialogs.service';

@Component({
  selector: 'app-entries-list-page',
  imports: [
    Toolbar,
    MatListModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    LoadingCentered,
    RouterLink,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <app-toolbar title="Entries">
      <button matButton [routerLink]="['/entry', 'enter']">Enter</button>
    </app-toolbar>
    <div class="content">
      <mat-form-field appearance="outline">
        <mat-label>Select Race</mat-label>
        <mat-select [formControl]="raceSelector">
          <mat-option [value]="'all'">All Races</mat-option>
          @for (race of currentRaces.selectedRaces(); track race.id) {
            <mat-option [value]="race.id">
              {{ race.seriesName }} - Race {{ race.raceOfDay }}
            </mat-option>
          }
        </mat-select>
      </mat-form-field>

      @if (competitorStore.loading()) {
        <app-loading-centered/>
      } @else if (filtered().length === 0) {
          <p class="placeholder">No entries for this selection</p>
      } @else {
          <mat-list>
            @for (comp of filtered(); track comp.id) {
              <mat-list-item>
                <span matListItemTitle>{{ comp.boatClass }} {{ comp.sailNumber }}</span>
                <span matListItemLine>
                  <span class=gap>{{ comp.helmCrew }}</span>
                  Handicap: {{comp.handicap.toString()}}
                </span>
                <span matListItemLine>
                  @if (comp.resultCode !== 'NOT FINISHED') { Finished }
              </span>
                <span matListItemMeta>
                  <button matIconButton (click)="delete(comp)">
                    <mat-icon class="warning">delete</mat-icon>
                  </button>
                </span>
              </mat-list-item>
            }
          </mat-list>
        }
    </div>
  `,
  styles: [`
    @use "mixins" as mix;

    @include mix.centered-column-page(".content", 400px);

    mat-form-field {
      margin-top: 16px;
      width: 300px;
    }

    h2 {
      margin-top: 24px;
      margin-bottom: 8px;
    }

    .warning {
      color: var(--mat-sys-error);
    }

    .placeholder {
      padding: 15px;
      text-align: center;
      font: var(--mat-sys-body-large);
    }

    .gap {
      margin-right: 10px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntriesListPage {
  protected readonly competitorStore = inject(RaceCompetitorStore);
  private readonly clubService = inject(ClubService);
  private readonly raceCalendarStore = inject(RaceCalendarStore);
  protected currentRaces = inject(CurrentRaces);
  protected ds = inject(DialogsService);
  protected snackbar = inject(MatSnackBar);

  raceSelector = new FormControl<string>('all');

  raceFilter = toSignal(this.raceSelector.valueChanges, { initialValue: 'all' });

  competitors = this.competitorStore.selectedCompetitors;

  filtered = computed(() =>
    this.competitors().filter(c => filter(c, this.raceFilter()!))
  );

  async delete(comp: RaceCompetitor) {
    if (comp.manualFinishTime || comp.recordedFinishTime) {
      this.snackbar.open("Can not delete an entry who has finished", "Dismiss", { duration: 3000 });
      return
    }
    const ok = await this.ds.confirm("Delete competitor", "Delete competitor");
    if (ok) {
      try {
        await this.competitorStore.deleteResult(comp);
      } catch (error: any) {
        this.snackbar.open("Error encountered deleting task", "Dismiss", { duration: 3000 });
        console.log('UpdateTask. Error deleting task: ' + error.toString());
      }
    }
  }
}

function filter(comp: RaceCompetitor, filter: string) {
  return (filter === 'all') || filter === comp.raceId;
}