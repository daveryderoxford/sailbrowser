import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { ClubService } from 'app/club';
import { LoadingCentered } from "app/shared/components/loading-centered";
import { Toolbar } from 'app/shared/components/toolbar';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';
import { Series } from '../model/series';
import { RaceCalendarStore } from '../services/full-race-calander';

@Component({
  selector: 'app-series-list',
  imports: [Toolbar, MatListModule, MatButtonModule, MatIconModule, RouterModule,
    MatDividerModule, MatTooltipModule, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, DatePipe, LoadingCentered, MatDividerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-toolbar title="Series">
      <a mat-icon-button matTooltip="New series" [routerLink]="['/race-calender/add']">
          <mat-icon>add</mat-icon>
      </a>
    </app-toolbar>

    <div class="content">
      <mat-form-field appearance="outline" class="search">
          <mat-label>Search</mat-label>
          <input matInput [formControl]="searchControl" placeholder="Search">
          @if(searchControl.value) {
          <button mat-icon-button matSuffix (click)="searchControl.setValue('')" aria-label="Clear search">
            <mat-icon>close</mat-icon>
          </button>
          }
      </mat-form-field>

      <mat-divider />

      @if (rcs.isLoading()) {
        <app-loading-centered/>
      } @else {
        <mat-list class="content">
            @for (series of filteredSeries(); track series.id) {
            <mat-list-item>
              <span matListItemTitle>{{series.name}} ({{series.season}})</span>
              <span matListItemLine>
                  {{getFleetName(series.fleetId)}}
                  @if(series.startDate) { - {{series.startDate | date}} }
              </span>
              <span matListItemMeta>
                  <button matIconButton aria-label="Edit" [routerLink]="['/race-calender/series-details/'+series.id]">
                    <mat-icon>edit</mat-icon>
                  </button>
              </span>
            </mat-list-item>
            <mat-divider />
            } @empty {
            <mat-list-item>
              <span matListItemTitle>No Series found</span>
            </mat-list-item>
            }
        </mat-list>
      }
    </div>
  `,
  styles: `
    @use "mixins" as mix;

    @include mix.centered-column-page(".content", 500px);

    .search {
      margin-top: 10px;
      margin-left: 15px;
      width: 300px;
    }
  `
})
export class SeriesList {
  protected rcs = inject(RaceCalendarStore);
  private cs = inject(ClubService);

  searchControl = new FormControl('');
  searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(startWith(''), debounceTime(100), distinctUntilChanged()),
    { initialValue: '' }
  );

  filteredSeries = computed(() => {
    const term = this.searchTerm()?.toLowerCase() ?? '';
    return this.rcs.allSeries().filter((s: Series) => !term || s.name.toLowerCase().includes(term) || s.season.toLowerCase().includes(term));
  });

  getFleetName = (id: string) => this.cs.club()?.fleets.find(f => f.id === id)?.name ?? 'Unknown Fleet';
}
