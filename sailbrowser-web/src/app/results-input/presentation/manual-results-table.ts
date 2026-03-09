import { ChangeDetectionStrategy, Component, computed, input, output, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RaceCompetitor } from '../model/race-competitor';
import { DurationPipe } from './duration.pipe';
import { sortEntries } from '../services/race-competitor-store';
import { Sort, MatSortModule, SortDirection } from '@angular/material/sort';

class TableData extends RaceCompetitor {
  correctedTime?: number;
}

@Component({
  selector: 'app-manual-results-table',
  imports: [MatTableModule, DatePipe, DurationPipe, MatSortModule],
  template: `
    <table mat-table matSort [dataSource]="tabledata()"
    (matSortChange)="this.sortState.set($event)" class="mat-elevation-z0">
      
      <ng-container matColumnDef="boatClass">
        <th mat-header-cell mat-sort-header *matHeaderCellDef>Class</th>
        <td mat-cell *matCellDef="let element"> {{element.boatClass}} </td>
      </ng-container>

      <ng-container matColumnDef="sailNumber">
        <th mat-header-cell mat-sort-header *matHeaderCellDef>Sail No</th>
        <td mat-cell *matCellDef="let element"> {{element.sailNumber}} </td>
      </ng-container>

      <ng-container matColumnDef="helm">
        <th mat-header-cell mat-sort-header *matHeaderCellDef>Helm</th>
        <td mat-cell *matCellDef="let element"> {{element.helm}} </td>
      </ng-container>

      <ng-container matColumnDef="finishTime">
        <th mat-header-cell mat-sort-header *matHeaderCellDef>Finish Time</th>
        <td mat-cell *matCellDef="let element"> {{element.manualFinishTime | date:'HH:mm:ss'}} </td>
      </ng-container>

      <ng-container matColumnDef="elapsedTime">
        <th mat-header-cell mat-sort-header *matHeaderCellDef>Elapsed</th>
        <td mat-cell *matCellDef="let element"> 
          {{element.elapsedTime | duration}}
        </td>
      </ng-container>

      <ng-container matColumnDef="correctedTime">
        <th mat-header-cell mat-sort-header *matHeaderCellDef>Corrected</th>
        <td mat-cell *matCellDef="let element">
          {{element.correctedTime | duration}}
        </td>
      </ng-container>

      <ng-container matColumnDef="averageLapTime">
        <th mat-header-cell *matHeaderCellDef>Avg Lap</th>
        <td mat-cell *matCellDef="let element"> 
          @if (element.finishTime) {
            {{element.averageLapTime | duration}} <br>
            {{element.numLaps}} {{element.numLaps == 1 ? 'lap' : 'laps'}}
          }
        </td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;" 
          [class.processed]="!!row.manualFinishTime"
          (click)="onRowClick(row)">
      </tr>
    </table>
  `,
  styles: [`
    :host {
      display: block;
    }
    table {
      width: 100%;
    }
    tr.processed {
      background-color: #f5f5f5;
      color: rgba(0,0,0,0.38);
      
      td {
        color: inherit;
      }
    }

    tr.mat-mdc-row:hover {
      background-color: rgba(0,0,0,0.04);
      cursor: pointer;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManualResultsTable {
  competitors = input.required<RaceCompetitor[]>();
  rowClicked = output<RaceCompetitor>();

  sortState = signal<Sort>({
    active: 'correctedTime',
    direction: 'asc'
  });

  protected displayedColumns = ['boatClass', 'sailNumber', 'helm', 'finishTime', 'elapsedTime', 'correctedTime', 'averageLapTime'];

  maxLaps = computed(() => this.competitors().reduce((max, comp) => {
    return (comp.numLaps > max) ? comp.numLaps : max;
  }, 0));

  onRowClick(row: RaceCompetitor) {
    this.rowClicked.emit(row);
  }

  corrected(comp: RaceCompetitor, maxLaps: number): number | undefined {
    if (comp.finishTime && comp.numLaps > 0 && comp.handicap > 0) {
      return comp.elapsedTime! * maxLaps / comp.numLaps * 1000 / comp.handicap;
    }
    return undefined;
  }

  tabledata = computed(() => {
    const maxLaps = this.maxLaps();
    const sort = this.sortState();

    return this.competitors().map(c => {
      const data = new TableData(c);
      data.correctedTime =  this.corrected(c, maxLaps);
      return data;
    }).sort((a, b) => {
      return manualRaceTableSort(a, b, sort.active as keyof TableData, sort.direction);
    });
  });
}

/** Sorts partially completed results
 * Unfinished competitors are placed at the top sorted by class/sail number
 * followed by finished competitirs sorted by 
 */
function manualRaceTableSort(
  a: TableData,
  b: TableData,
  finishedOrder: keyof TableData,
  dir: SortDirection
): number {
  // A competitor is considered 'finished' for sorting if 
  // they have a finish time and an 'OK' result code.
  const aFinished = !!a.finishTime && a.resultCode === 'OK';
  const bFinished = !!b.finishTime && b.resultCode === 'OK';

  // If one is finished and the other isn't, unfinished goes first
  if (aFinished !== bFinished) {
    return aFinished ? 1 : -1;
  }

  // If both finished, sort by finishedOrder property
  if (aFinished && bFinished && a.elapsedTime && b.elapsedTime) {
    const valueA = a[finishedOrder];
    const valueB = b[finishedOrder];
    let ret = 0;
    if (valueA instanceof Date && valueB instanceof Date) {
      ret = valueA.getTime() - valueB.getTime();
    } else if (typeof valueA === 'number') {
      ret = (valueA as number) - (valueB as number);
    } else if (typeof valueA === 'string') {
      ret = valueA.localeCompare(valueB as string)
    } else {
      console.error('ManualResultsPage: Unexpected sort order' + finishedOrder);
      ret = 0;
    }
    return (dir === 'asc') ? ret : -ret;
  }

  // If both unfinished, standard sort (Class/SailNo)
  return sortEntries(a, b);
}
