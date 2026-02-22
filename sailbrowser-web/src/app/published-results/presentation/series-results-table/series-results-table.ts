import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

import { CdkTableModule } from '@angular/cdk/table';

import { PublishedSeries, PublishedSeriesResult } from 'app/published-results';
import { format } from 'date-fns';

export const allSeriesColumns = ['rank', 'name', 'boatClass', 'sailNumber', 'club', 'handicap', 'totalPoints', 'netPoints'] as const;
export type SeriesColumn = typeof allSeriesColumns[number];

@Component({
  selector: 'app-series-results-table',
  templateUrl: './series-results-table.html',
  styleUrls: ['./series-results-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CdkTableModule]
})
export class SeriesResultsTable {

  series = input.required<PublishedSeries>();
  seriesColumns = input<SeriesColumn[]>([...allSeriesColumns]);
  raceTitles = input.required<{ id: string; index: number; scheduledStart: Date; raceOfDay: number; }[]>();
  fontSize = input<string>('10pt');
  raceClicked = output<string>();

  raceColumns = computed(() => {
    const scores = this.series()!.competitors[0]?.raceScores ?? [];

    // Creates an array of length n where each entry is it's index 
    return Array.from({ length: scores.length }, (_, i) => i.toString());

  });

  displayedColumns = computed(() => [...this.seriesColumns(), ...this.raceColumns()]);

  tableData = computed(() => {
    return this.series()?.competitors.map(c => ({
      ...c,
      name: c.crew ? `${c.helm} / ${c.crew}` : c.helm
    })) || [];
  });

  raceTitle(index: number): string {
    const title = this.raceTitles()[index];
    let ret = 'Race ' + title.index.toString() + '<br>';
    if (title.scheduledStart) {
      ret = `${ret} ${format(title.scheduledStart, 'mm/dd')}`;
    }
    if (title.raceOfDay > 0) {
      ret = `${ret} ${title.raceOfDay.toString()}`;
    }
    return ret;
  }

  isCompetitorSelected(comp: PublishedSeriesResult): boolean {
    return false;
  }

  updateSelectedCompetitor(comp: PublishedSeriesResult) {

  }

  trackByKey(index: number, item: PublishedSeriesResult) {
    return item.sailNumber.toString() + item.boatClass + item.helm;
  }

  onRaceHeaderClick(raceIndex: number) {
    const id = this.raceTitles()[raceIndex].id;
    this.raceClicked.emit(id);
  }
}
