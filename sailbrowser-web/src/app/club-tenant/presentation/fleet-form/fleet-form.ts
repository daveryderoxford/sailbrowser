
import { ChangeDetectionStrategy, Component, effect, inject, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SubmitButton } from 'app/shared/components/submit-button';
import { DeleteButton } from 'app/shared/components/delete-button';
import { Fleet } from 'app/club-tenant/model/fleet';
import { ClubStore } from 'app/club-tenant';
import { HANDICAP_SYSTEMS, HandicapSystem } from 'app/scoring';

@Component({
  selector: 'app-fleet-form',
  templateUrl: './fleet-form.html',
  styles: `
    @use "mixins" as mix;

    @include mix.form-page("form", 350px);

    .form-group-section {
      display: contents;
    }
  `,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, SubmitButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FleetForm {

  cs = inject(ClubStore);

  fleet = input<Fleet | undefined>();

  handicapSystems = HANDICAP_SYSTEMS;

  busy = input<boolean>(false);
  submitted = output<Partial<Fleet>>();

  form = new FormGroup({
    shortName: new FormControl('', { validators: [Validators.required] }),
    name: new FormControl('', { validators: [Validators.required] }),
    handicapSystems: new FormControl<HandicapSystem[]>([]),
  });

  constructor() {
    effect(() => {
      if (this.fleet()) {
        this.form.patchValue(this.fleet()!);
      }
    });
  }

  submit() {
    const output: Partial<Fleet> = this.form.getRawValue() as Partial<Fleet>;
    this.submitted.emit(output);
    this.form.reset();
  }

  public canDeactivate(): boolean {
    return !this.form.dirty;
  }
}
