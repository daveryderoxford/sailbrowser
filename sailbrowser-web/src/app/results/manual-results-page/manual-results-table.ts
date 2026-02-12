import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RaceCompetitor } from 'app/race/@store/race-competitor';
import { DurationPipe } from './duration.pipe';

interface ProcessedCompetitor extends RaceCompetitor {
  elapsedTime?: number;
  avgLapTime?: number;
}

@Component({
  selector: 'app-manual-results-table',
  imports: [MatTableModule, DatePipe, DurationPipe],
  template: `
    <table mat-table [dataSource]="processedCompetitors()" class="mat-elevation-z0">
      
      <ng-container matColumnDef="boatClass">
        <th mat-header-cell *matHeaderCellDef> Class </th>
        <td mat-cell *matCellDef="let element"> {{element.boatClass}} </td>
      </ng-container>

      <ng-container matColumnDef="sailNumber">
        <th mat-header-cell *matHeaderCellDef> Sail No </th>
        <td mat-cell *matCellDef="let element"> {{element.sailNumber}} </td>
      </ng-container>

      <ng-container matColumnDef="helm">
        <th mat-header-cell *matHeaderCellDef> Helm </th>
        <td mat-cell *matCellDef="let element"> {{element.helm}} </td>
      </ng-container>

      <ng-container matColumnDef="finishTime">
        <th mat-header-cell *matHeaderCellDef> Finish Time </th>
        <td mat-cell *matCellDef="let element"> {{element.manualFinishTime | date:'HH:mm:ss'}} </td>
      </ng-container>

      <ng-container matColumnDef="laps">
        <th mat-header-cell *matHeaderCellDef> Laps </th>
        <td mat-cell *matCellDef="let element"> {{element.manualLaps}} </td>
      </ng-container>

      <ng-container matColumnDef="elapsedTime">
        <th mat-header-cell *matHeaderCellDef> Elapsed </th>
        <td mat-cell *matCellDef="let element"> {{element.elapsedTime | duration}} </td>
      </ng-container>

      <ng-container matColumnDef="avgLapTime">
        <th mat-header-cell *matHeaderCellDef> Avg Lap </th>
        <td mat-cell *matCellDef="let element"> {{element.avgLapTime | duration}} </td>
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

  protected displayedColumns = ['boatClass', 'sailNumber', 'helm', 'finishTime', 'laps', 'elapsedTime', 'avgLapTime'];

  processedCompetitors = computed<ProcessedCompetitor[]>(() => {
    const processed = this.competitors().map(c => {
      const competitor: ProcessedCompetitor = { ...c };
      if (c.manualFinishTime && c.startTime) {
        competitor.elapsedTime = c.manualFinishTime.getTime() - c.startTime.getTime();
        if (c.manualLaps > 0) {
          competitor.avgLapTime = competitor.elapsedTime / c.manualLaps;
        }
      }
      return competitor;
    });

    return processed.sort((a, b) => {
      const aHasTime = a.avgLapTime !== undefined;
      const bHasTime = b.avgLapTime !== undefined;

      if (aHasTime && bHasTime) {
        return a.avgLapTime! - b.avgLapTime!;
      }
      if (aHasTime) {
        return -1; // a comes first
      }
      if (bHasTime) {
        return 1; // b comes first
      }
      // sort by helm if no time
      return a.helm.localeCompare(b.helm);
    });
  });


  onRowClick(row: RaceCompetitor) {
    this.rowClicked.emit(row);
  }
}
