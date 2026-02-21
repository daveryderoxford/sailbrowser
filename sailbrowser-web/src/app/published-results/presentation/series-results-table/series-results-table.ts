import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PublishedSeries } from 'app/published-results';

export const allSeriesColumns = ['rank', 'fleet', 'class', 'sailNumber', 'helm', 'crew', 'handicap'] as const;
export type SeriesColumn = typeof allSeriesColumns[number];

@Component({
  selector: 'app-results-table',
  templateUrl: './series-results-table.html',
  styleUrls: ['./series-results-table.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatFormFieldModule, MatSelectModule, ReactiveFormsModule, MatSlideToggleModule, MatTableModule, MatSortModule, MatTooltipModule,
    MatCheckboxModule]
})
export class ResultsTable {
  series = input.required<PublishedSeries>();

  seriesColumns = input<SeriesColumn[]>([...allSeriesColumns]);

  raceColumns = computed(() => {
    const scores = this.series().competitors[0]?.raceScores ?? [];

    // Creates an array of length n where each entry is its index
    return Array.from({ length: scores.length }, (_, i) => i.toString());

  });

  displayedColumns = computed(() => [...this.seriesColumns(), ...this.raceColumns()]);

  tableData = computed(() => {
    const series = this.series();
    if (!series.competitors) return [];
    // Assuming you want to sort the results.
    // The original code had broken bits I am trying to fix.
    return series.competitors;
  });

  raceTitle(index: number): string {
    // TODO
    return index.toString();
  }

  isCompetitorSelected(comp: any): boolean {
    return false;
  }

  updateSelectedCompetitor(comp: any) {

  }

  tackByKey() {

  }


}
