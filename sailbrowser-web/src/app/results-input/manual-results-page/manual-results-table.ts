import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { RaceCompetitor } from 'app/results-input/@store/race-competitor';
import { DurationPipe } from './duration.pipe';

@Component({
  selector: 'app-manual-results-table',
  imports: [MatTableModule, DatePipe, DurationPipe],
  template: `
    <table mat-table [dataSource]="competitors()" class="mat-elevation-z0">
      
      <ng-container matColumnDef="boatClass">
        <th mat-header-cell *matHeaderCellDef>Class</th>
        <td mat-cell *matCellDef="let element"> {{element.boatClass}} </td>
      </ng-container>

      <ng-container matColumnDef="sailNumber">
        <th mat-header-cell *matHeaderCellDef>Sail No</th>
        <td mat-cell *matCellDef="let element"> {{element.sailNumber}} </td>
      </ng-container>

      <ng-container matColumnDef="helm">
        <th mat-header-cell *matHeaderCellDef>Helm</th>
        <td mat-cell *matCellDef="let element"> {{element.helm}} </td>
      </ng-container>

      <ng-container matColumnDef="finishTime">
        <th mat-header-cell *matHeaderCellDef>Finish Time</th>
        <td mat-cell *matCellDef="let element"> {{element.manualFinishTime | date:'HH:mm:ss'}} </td>
      </ng-container>

      <ng-container matColumnDef="elapsedTime">
        <th mat-header-cell *matHeaderCellDef>Elapsed</th>
        <td mat-cell *matCellDef="let element"> 
          {{element.elapsedTime | duration}}
        </td>
      </ng-container>

      <ng-container matColumnDef="correctedTime">
        <th mat-header-cell *matHeaderCellDef>Corrected</th>
        <td mat-cell *matCellDef="let element">
          {{corrected(element) | duration}}
        </td>
      </ng-container>

      <ng-container matColumnDef="avgLapTime">
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

  protected displayedColumns = ['boatClass', 'sailNumber', 'helm', 'finishTime', 'elapsedTime', 'correctedTime', 'avgLapTime'];

  maxLaps = computed(() => this.competitors().reduce((max, comp) => {
    return (comp.numLaps > max) ? comp.numLaps : max;
  }, 0));

  onRowClick(row: RaceCompetitor) {
    this.rowClicked.emit(row);
  }

  corrected(comp: RaceCompetitor): number | undefined {
    if (comp.finishTime && this.maxLaps() > 0) {
      return comp.elapsedTime! / this.maxLaps() * comp.handicap /1000;
    }
    return undefined;
  }
}
