import { Component, computed, effect, inject, input } from '@angular/core';
import { Toolbar } from "app/shared/components/toolbar";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { SeasonList } from "../season-list/season-list";
import { PublishedResultsReader } from 'app/published-results/services/published-results-store';
import { SeriesResultsTable } from "../series-results-table/series-results-table";
import { LoadingCentered } from "../../../shared/components/loading-centered";
import { RaceResultsTable } from "../race-results-table/race-results-table";

@Component({
  selector: 'app-results-viewer.ts',
  imports: [Toolbar, SeasonList, SeriesResultsTable, LoadingCentered, RaceResultsTable],
  templateUrl: './results-viewer.html',
  styles: `
  .layout-container {
    display: grid;
    grid-template-columns: 300px 1fr; /* Desktop default */
    height: 100vh;
  }

  .layout-container.mobile-mode {
    grid-template-columns: 1fr; /* Sidebar is *ngIf-ed away, content takes all */
  }

  .desktop-sidebar {
    border-right: 1px solid #eee;
    overflow-y: auto;
  }
  
  `,
})
export class ResultsViewer {

  protected store = inject(PublishedResultsReader);
  private breakpoint = toSignal(inject(BreakpointObserver).observe([Breakpoints.Handset]));
  protected reader = inject(PublishedResultsReader);

  id = input.required<string>();  // Route parameter

  isMobile = computed(() => this.breakpoint()?.matches );

  series = this.store.series;
  races = this.store.races;

  raceTitles = computed(() => this.races().map((({ id, index, scheduledStart, raceOfDay }) => ({
      id,  
      index,
      scheduledStart,
      raceOfDay
    })
  )));

  constructor() {
    // Effect to read series data when the selected Id changes
    // based on route parameter
    effect(() => {
      this.store.selectedSeriesId.set(this.id());
    });
  }
  raceClicked(raceId: string) {

  }
}
