import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { endOfDay, isWithinInterval } from 'date-fns';
import { LoadingCentered } from "app/shared/components/loading-centered";
import { PublishedResultsReader } from '../../services/published-results-store';

/** List of published seasons displayed in the 
 * left panel of the results viewer on desktop and
 * in the mobile season list page */ 
@Component({
  selector: 'app-season-list',
  imports: [
    MatExpansionModule,
    MatListModule,
],
  templateUrl: './season-list.html',
  styles: `
    :host {
      display: block;
      padding: 16px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SeasonList {
  protected store = inject(PublishedResultsReader);

  private allSeries = computed(() => this.store.seasons().flatMap(season => season.series));

  inProgressSeries = computed(() => {
    const now = new Date();
    return this.allSeries().filter(series => {
      return isWithinInterval(now, {
        start: new Date(series.startDate),
        end: endOfDay(new Date(series.endDate)),
      });
    });
  });
}
