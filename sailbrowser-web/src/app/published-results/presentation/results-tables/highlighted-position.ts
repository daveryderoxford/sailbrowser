import { ChangeDetectionStrategy, Component, input } from '@angular/core';


@Component({
   selector: 'app-highlight-position',
   changeDetection: ChangeDetectionStrategy.OnPush,
   template: `
    <div class="rank-oval" [class]="'rank-' + position()">
      @if (isDiscard()) {
       ({{ position() }})
      } @else {
        {{ position() }}
      }
    </div>
  `,
   styles: `
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    .rank-oval {
      width: 30px;
      height: 18px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;
      color: var(--mat-sys-color-on-primary);
    }

    .rank-1 {
      background-color: #FFD700; /* Gold */
    }

    .rank-2 {
      background-color: #C0C0C0; /* Silver */
    }

    .rank-3 {
      background-color: #CD7F32; /* Bronze */
    }

    .discarded {
      color: var(--mat-sys-color-on-surface-variant);
    }

  `,
})
export class HighlightPosition {
   position = input.required<number | string>();
   isDiscard = input(false);
}