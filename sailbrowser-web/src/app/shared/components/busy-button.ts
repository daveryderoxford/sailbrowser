import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MatButtonAppearance, MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-busy-button',
  template: `
    <button
      [type]="type()"
      [matButton]="style()"
      [disabled]="busy() || disabled()"
      (click)="$event.stopPropagation(); click.emit()"
    >
      @if (busy()) {
      <mat-progress-spinner diameter="24" mode="indeterminate" />
      } @else {
      <ng-content></ng-content>
      }
    </button>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      button {
        width: 100%;
      }
    `,
  ],
  imports: [MatButtonModule, MatProgressSpinnerModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BusyButton {
  busy = input<boolean>(false);
  disabled = input<boolean>(false);
  type = input<string>('button');
  style = input<MatButtonAppearance>('filled');
  click = output();
}
