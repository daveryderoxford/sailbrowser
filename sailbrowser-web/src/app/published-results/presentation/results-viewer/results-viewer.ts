import { Component, computed, effect, inject, input, signal, ElementRef } from '@angular/core';
import { Toolbar } from "app/shared/components/toolbar";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { SeasonList } from "../season-list/season-list";
import { PublishedResultsReader } from 'app/published-results/services/published-results-store';
import { SeriesResultsTable } from "../results-tables/series-results-table/series-results-table";
import { LoadingCentered } from "../../../shared/components/loading-centered";
import { RaceResultsTable } from "../results-tables/race-results-table/race-results-table";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-results-viewer',
  imports: [Toolbar, SeasonList, SeriesResultsTable, LoadingCentered, RaceResultsTable, MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './results-viewer.html',
  styleUrl: './results-viewer.scss',
})
export class ResultsViewer {

  protected store = inject(PublishedResultsReader);
  private breakpoint = toSignal(inject(BreakpointObserver).observe([Breakpoints.Handset]));
  protected reader = inject(PublishedResultsReader);
  protected isPanelCollapsed = signal(false);
  private elementRef = inject(ElementRef);

  id = input.required<string>();  // Route parameter

  isMobile = computed(() => this.breakpoint()?.matches );

  series = this.store.series;
  races = this.store.races;
  reversedRaces = computed(() => [...this.races()].reverse());

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
    const raceElement = this.elementRef.nativeElement.querySelector(`[data-race-id="${raceId}"]`);
    raceElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToTop() {
    this.elementRef.nativeElement.querySelector('.content-area')?.scrollTo({ top: 0, behavior: 'smooth' });
  }

  togglePanel() {
    this.isPanelCollapsed.update(v => !v);
  }
}
