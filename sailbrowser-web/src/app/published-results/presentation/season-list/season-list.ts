import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { PublishedSeason } from 'app/published-results';
import { normaliseString } from 'app/shared/utils/string-utils';
import { endOfDay, isWithinInterval } from 'date-fns';

/**
 * A dumb component to display a list of published race series, grouped by season.
 * It allows filtering by fleet and emits an event when a series is selected.
 */
@Component({
  selector: 'app-season-list',
  imports: [
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    RouterLink,
  ],
  templateUrl: './season-list.html',
  styles: `
   .container {
      background: var(--mat-sys-surface-variant);
      padding: 15px;
   }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeasonList {
  /** Input for the seasons and their series to be displayed. */
  seasons = input.required<PublishedSeason[]>();

  /** Signal to hold the current filter text for fleets. */
  protected fleetFilter = signal('');

  private allSeries = computed(() => this.seasons().flatMap(season => season.series));

  inProgressSeries = computed(() => {
    const now = new Date();
    return this.allSeries().filter(series => {
      return isWithinInterval(now, {
        start: new Date(series.startDate),
        end: endOfDay(new Date(series.endDate)),
      });
    });
  });

  /**
   * A computed signal that filters the seasons based on the fleetFilter.
   * A season is included if any of its series contain a fleet matching the filter.
   */
  protected filteredSeasons = computed(() => {
    const filter = normaliseString(this.fleetFilter());
    if (!filter) {
      return this.seasons();
    }

    return this.seasons().map((season) => ({
      ...season,
      series: season.series.filter((series) => series.fleetId === filter)
    }));
  });

  // Expansion data. In progress series followed by seasons
  protected expansionPanels = computed( () => {
    return [
      {title: 'In Progress', series: this.inProgressSeries()},
      ...this.filteredSeasons().map( s => ({title: s.id, series: s.series}))
    ]
  });

  /**
   * TrackBy function for the season list to improve performance.
   */
  protected trackBySeasonName(index: number, season: PublishedSeason): string {
    return season.id;
  }
}
