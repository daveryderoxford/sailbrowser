import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { Toolbar } from "app/shared/components/toolbar";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { SeasonList } from "../season-list/season-list";
import { PublishedResultsReader } from 'app/published-results/services/published-results-store';
import { SeriesResultsTable } from "../series-results-table/series-results-table";
import { LoadingCentered } from "../../../shared/components/loading-centered";
import { RaceResultsTable } from "../race-results-table/race-results-table";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-results-viewer',
  imports: [Toolbar, SeasonList, SeriesResultsTable, LoadingCentered, RaceResultsTable, MatIconModule, MatButtonModule],
  templateUrl: './results-viewer.html',
  styles: `
  .layout-container {
    display: grid;
    grid-template-columns: 300px 1fr; /* Desktop default */
    height: 100vh;
    transition: grid-template-columns 0.3s ease-in-out;
  }

  .layout-container.panel-collapsed {
    grid-template-columns: 0px 1fr;
  }

  .layout-container.mobile-mode {
    grid-template-columns: 1fr; /* Sidebar is *ngIf-ed away, content takes all */
  }

  .sidebar {
    border-right: 1px solid #eee;
    overflow-y: auto;
    overflow-x: hidden; /* Hide content as it collapses */
  }

  .content-area {
    position: relative; /* For positioning the toggle button */
    display: flex;
    justify-content: center; /* Center the tables-container horizontally */
    overflow-y: auto;
    padding: 2rem;
  }

  .tables-container {
    width: 100%;
    max-width: 1200px; /* Max width for the tables */
  }

  .panel-toggle-button {
    position: absolute;
    top: 16px;
    left: 16px;
    z-index: 10;
  }
  `,
})
export class ResultsViewer {

  protected store = inject(PublishedResultsReader);
  private breakpoint = toSignal(inject(BreakpointObserver).observe([Breakpoints.Handset]));
  protected reader = inject(PublishedResultsReader);
  protected isPanelCollapsed = signal(false);

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

  togglePanel() {
    this.isPanelCollapsed.update(v => !v);
  }
}
