import { ChangeDetectionStrategy, Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SubmitButton } from 'app/shared/components/submit-button';
import { BoatClass } from '../../model/boat-class';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.html',
  styles: `
    @use "mixins" as mix;

    @include mix.form-page("form", 350px);

    .button-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 16px;
    }
  `,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatButtonModule, SubmitButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassForm {

  boatClass = input<BoatClass | undefined>();

  busy = input<boolean>(false);
  submitted = output<Partial<BoatClass>>();

  form = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    handicap: new FormControl<number>(1000, { validators: [Validators.required] }),
  });

  constructor() {
    effect(() => {
      if (this.boatClass()) {
        this.form.patchValue(this.boatClass()!);
      }
    });
  }

  submit() {
    const output: Partial<BoatClass> = this.form.getRawValue() as Partial<BoatClass>;
    this.submitted.emit(output);
    this.form.reset();
  }

  public canDeactivate(): boolean {
    return !this.form.dirty;
  }
}
