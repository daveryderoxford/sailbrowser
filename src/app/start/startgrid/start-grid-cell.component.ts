import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-grid-cell',
  template: `
    <td> <img *ngIf="iconDisplayed()" src={{getIconPath()}} width=40px height=40px/><br>{{title}}</td>
  `,
  styles: [
    'td { text-align: center; vertical-align: center; width:100px; height: 80px; }',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartGridCellComponent implements OnInit {

  @Input() title: string | undefined = '';
  @Input() icon: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  getIconPath(): string {
    return '/assets/flags/' + this.icon + '.png';
  }

  iconDisplayed() {
    return (this.icon !== undefined) && (this.icon !== null);
  }
}
