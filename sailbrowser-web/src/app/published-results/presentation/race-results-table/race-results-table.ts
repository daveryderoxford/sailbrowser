import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { CdkTableModule } from '@angular/cdk/table';

import { PublishedRace } from 'app/published-results/model/published-race';

@Component({
  selector: 'app-race-results-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkTableModule],
  templateUrl: './race-results-table.html',
  styles: ``,

})
export class RaceResultsTable {
  race = input.required<PublishedRace>();

}
