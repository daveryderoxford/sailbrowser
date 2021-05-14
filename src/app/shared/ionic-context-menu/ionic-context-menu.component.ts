import { Component, Input } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { IonicContextMenuContentComponent } from './ionic-context-menu-content.component';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ionic-context-menu',
  template: `
    <div>
      <ion-button [color]="color"
                  [fill]="fill"
                  [mode]="mode"
                  [shape]="shape"
                  [size]="size"
                  [strong]="strong"
                  (click)="present(template, $event)">
        <ion-icon slot="end" [name]="icon"></ion-icon>
      </ion-button>
      <ng-template #template>
        <div (click)="popover.dismiss()">
          <ng-content></ng-content>
        </div>
      </ng-template>
    </div>
  `,
  styles: []
})
export class IonicContextMenuComponent {
  @Input() icon = 'ellipsis-vertical-sharp';
  @Input() color?: any;
  @Input() fill: 'clear' | 'outline' | 'solid' | 'default' = 'clear';
  @Input() mode?: 'ios' | 'md';
  @Input() shape?: 'round';
  @Input() size: 'small' | 'default' | 'large' = 'default';
  @Input() strong = false;

  popover!: HTMLIonPopoverElement;

  constructor(private popoverCtrl: PopoverController) { }

  async present(child: any, event: any) {
    this.popover = await this.popoverCtrl.create({
      component: IonicContextMenuContentComponent,
      componentProps: {
        template: child
      },
      event: event,
      translucent: true
    });
    return await this.popover.present();
  }
}
