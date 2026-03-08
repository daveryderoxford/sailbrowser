import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { Component, computed, effect, ElementRef, inject, input, Signal, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { PublishedResultsReader } from 'app/published-results/services/published-results-store';
import { LoadingCentered } from 'app/shared/components/loading-centered';
import { Toolbar } from "app/shared/components/toolbar";
import { RaceResultsTable } from "../results-tables/race-results-table/race-results-table";
import { SeriesResultsTable } from "../results-tables/series-results-table/series-results-table";
import { SeasonList } from "../season-list/season-list";
import { CenteredText } from 'app/shared/components/centered-text';
import { ClubStore, Fleet } from 'app/club-tenant';

@Component({
  selector: 'app-results-viewer',
  imports: [Toolbar, SeasonList, SeriesResultsTable, LoadingCentered, RaceResultsTable, MatIconModule, MatButtonModule, DatePipe, CenteredText, RouterLink],
  templateUrl: './results-viewer.html',
  styleUrl: './results-viewer.scss',
})
export class ResultsViewer {

  protected store = inject(PublishedResultsReader);
  protected cs = inject(ClubStore);
  private breakpoint = toSignal(inject(BreakpointObserver).observe([Breakpoints.Handset]));
  protected reader = inject(PublishedResultsReader);
  protected isPanelCollapsed = signal(false);
  private elementRef = inject(ElementRef);

  id = input<string>('');  // Route parameter

  isMobile = computed(() => this.breakpoint()?.matches );

  series = this.store.series;
  races = this.store.races;
  seasons = this.store.seasons;
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

  fleetName(fleetId: string): string | undefined {
    return this.cs.findFleet(fleetId)()?.name;
  }
}
