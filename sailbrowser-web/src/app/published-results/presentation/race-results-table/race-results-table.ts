import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { CdkTableModule } from '@angular/cdk/table';

import { PublishedRace } from 'app/published-results/model/published-race';

export type NavClicked = 'series' | 'next' | 'previous';

@Component({
  selector: 'app-race-results-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkTableModule],
  templateUrl: './race-results-table.html',
  styles: `
  .box {
    width: 300px;
    height: 500px;
    background: var(--mat-sys-surface-container-high);
    text-align: center;
    border-radius: var(--mat-sys-corner-large);
  }
  `,

})
export class RaceResultsTable {
  race = input.required<PublishedRace>();
  navClicked = output<NavClicked>()
}
