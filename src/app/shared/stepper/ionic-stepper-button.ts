import { Directive } from '@angular/core';
import { IonicStepperComponent } from './ionic-stepper';

/** Button that moves to the next step in a stepper workflow. */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ionicStepperNext]',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '(click)': '_stepper.nextStep()',
  }
})
export class IonicStepperNextDirective {

  constructor(public _stepper: IonicStepperComponent) { }
}

/** Button that moves to the previous step in a stepper workflow. */
@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[ionicStepperPrevious]',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '(click)': '_stepper.previousStep()',
  }
})
export class IonicStepperPreviousDirective {

  constructor(public _stepper: IonicStepperComponent) { }
}
