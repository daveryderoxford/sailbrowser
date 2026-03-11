import { CdkTableModule } from '@angular/cdk/table';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RaceResult } from 'app/published-results/model/published-race';
import { competitorColumns, nameColumnWidth } from '../results-table-shared';
import { DurationPipe } from 'app/shared/pipes/duration.pipe';

export const raceColumns = [...competitorColumns, 'elapsed', 'corrected','points'] as const;
export type RaceColumn = typeof raceColumns[number];

@Component({
  selector: 'app-race-results-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkTableModule, DurationPipe],
  templateUrl: './race-results-table.html',
  styleUrls: ['../results-table-shared.scss', './race-results-table.scss'],
})
export class RaceResultsTable {
  results = input.required<RaceResult[]>();
  columns = input<RaceColumn[]>([...raceColumns]);
  showBoatClass = input(true);
  fontSize = input(10);

  displayedColumns = this.columns;

   nameColumnWidth = computed(() => 
      nameColumnWidth(this.results()));

  /** Add additonal composite fields to competitor */
  tableData = computed(() => {
    return this.results().map(c => ({
      ...c,
      helmCrew: c.crew ? `${c.helm} <br> ${c.crew}` : c.helm,
      boat: this.showBoatClass() ? `${c.boatClass} <br> ${c.sailNumber}` : c.sailNumber
    })) || [];
  });

  trackByKey(index: number, item: RaceResult) {
    return item.sailNumber.toString() + item.boatClass + item.helm;
  }

  isCompetitorSelected(comp: RaceResult): boolean {
    return false;
  }

  updateSelectedCompetitor(comp: RaceResult) {

  }

}
