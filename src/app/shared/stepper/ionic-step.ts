import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

export type IonicStepStatus = ('' | 'error');

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ion-step',
  template: `
  <ng-template><ng-content></ng-content></ng-template>
  `
})
export class IonicStepComponent {

  @Input() disabled!: boolean;
  @Input() label!: string;
  @Input() description!: string;
  @Input() icon = 'number';
  @Input() errorIcon = 'close';
  @Input() status: IonicStepStatus = '';

  @ViewChild(TemplateRef) content!: TemplateRef<any>;

  index!: number;

}
