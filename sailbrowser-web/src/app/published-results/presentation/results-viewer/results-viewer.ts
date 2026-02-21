import { Component, computed, effect, inject, input } from '@angular/core';
import { Toolbar } from "app/shared/components/toolbar";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { SeasonList } from "../season-list/season-list";
import { PublishedResultsReader } from 'app/published-results/services/published-results-store';

@Component({
  selector: 'app-results-viewer.ts',
  imports: [Toolbar, SeasonList],
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

  id = input<string | undefined>(undefined);
  private store = inject(PublishedResultsReader);
  private breakpoint = toSignal(inject(BreakpointObserver).observe([Breakpoints.Handset]));

  isMobile = computed(() => this.breakpoint()?.matches );

  constructor() {
    effect(() => {
      this.store.selectedSeriesId.set(this.id());
    });
  }
}
