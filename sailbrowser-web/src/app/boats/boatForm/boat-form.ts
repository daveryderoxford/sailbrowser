
import { ChangeDetectionStrategy, Component, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClubService } from 'app/club/@store/club.service';

@Component({
  selector: 'app-boat-form',
  templateUrl: './boat-form.html',
  styleUrl: 'boat-form.scss',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatCheckboxModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoatForm {

  cs = inject(ClubService);

  boat = input<Boat | undefined>();
  submitted = output<Partial<Boat>>();
  deleted = output<Boat>();

  form = new FormGroup({
    boatClass: new FormControl('', { validators: [Validators.required] }),
    sailNumber: new FormControl<Number>(0, { validators: [Validators.required, Validators.min(0)] }),
    name: new FormControl(''),
    helm: new FormControl(''),
    crew: new FormControl(''),
    isClub: new FormControl<boolean>(false),
  });

  constructor() {
    effect(() => {
      if (this.boat()) {
        this.form.patchValue(this.boat()!);
      }
    });
  }

  submit() {
    const output: Partial<Boat> = this.form.getRawValue() as Partial<Boat>;
    this.submitted.emit(output);
    this.form.reset();
  }

  public canDeactivate(): boolean {
    return !this.form.dirty;
  }
}
