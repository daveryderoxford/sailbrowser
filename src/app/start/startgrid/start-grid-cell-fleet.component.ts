import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Fleet } from 'app/model/fleet';

@Component({
  selector: 'app-start-grid-cell-fleet',
  template: `
    <app-start-grid-cell [title]="fleet?.shortName" [icon]="fleet?.classFlag"></app-start-grid-cell>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartGridCellFleetComponent implements OnInit {

  @Input() fleet!: Fleet;

  constructor() { }

  ngOnInit(): void {
  }
}
