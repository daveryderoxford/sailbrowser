import { assertNotNull } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoatsQuery, BoatsService, boatTypes } from 'app/boats/index';
import { Boat, createBoat } from 'app/boats/index';
import { ratingSystems } from 'app/scoring/handicap';
import { assertExists } from 'app/utilities/misc';

@Component({
  selector: 'app-boat-form',
  templateUrl: './boat-edit.component.html',
  styleUrls: ['./boat-edit.component.scss'],
})
export class BoatEditComponent {

  handicapAlgorithms = ratingSystems;
  boatTypes = boatTypes;

  form: FormGroup;
  boat: Boat | undefined;

  constructor(private formBuilder: FormBuilder,
    private bs: BoatsService,
    private bq: BoatsQuery,
    private router: Router) {
    this.form = this.formBuilder.group({
      sailingClass: [''],
      sailNumber: ['', [Validators.required, Validators.min(0)]],
      type: [''],
      name: [''],
      owner: ['', Validators.required],
      helm: ['', Validators.required],
      crew: [''],
      handicaps: [],
    });
  }

  ionViewWillEnter(): void {

    this.boat = this.bq.getActive();

    if (this.boat) {
      this.form.patchValue(this.boat);
    } else {
      this.form.patchValue(createBoat({}));
    }
  }

  canDeactivate(): boolean {
    return !this.form.dirty;
  }

  cancel() {
    this.router.navigate(['/boats']);
  }

  save() {
    if (this.boat) {
      this.bs.update(this.boat.id, this.form.value);
    } else {
      this.bs.add(this.form.value);
    }
    this.form.reset();
    this.router.navigate(['/boats']);
  }

  delete() {
    this.boat = assertExists(this.boat);

    this.bs.remove(this.boat.id);
    this.form.reset();
    this.router.navigate(['/boats']);
  }

}
