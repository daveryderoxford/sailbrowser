import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createBoat } from 'app/boats';
import { Result } from 'app/competitor/@store/result.model';
import { ResultQuery } from 'app/competitor/@store/result.query';
import { ResultService } from 'app/competitor/@store/result.service';
import { assertExists } from 'app/utilities/misc';

@Component({
  selector: 'app-edit-result',
  templateUrl: './edit-result.component.html',
  styleUrls: ['./edit-result.component.css']
})
export class EditResultComponent {

  result: Result | undefined;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private resultService: ResultService,
    private resultQuery: ResultQuery,
    private router: Router) {
    this.form = this.formBuilder.group({
      helm: ['', Validators.required],
      crew: [''],
      boatClass: [''],
      sailNumber: ['', [Validators.required, Validators.min(0)]],
      handicap: [0, Validators.required, Validators.min(0)],
      position: [0, Validators.required, Validators.min(1)],
      points: [0, Validators.required, Validators.min(1)],
      startTime: [ '', Validators.required],
      finishTime: [ '', Validators.required],
      elapsedTime: [ '', Validators.required],
      correctedTime: [ '', Validators.required],
      resultCode: [ 'NotFinished', Validators.required],
      isDiscarded: [ 'false', Validators.required],
      isDiscardable: [ 'true', Validators.required],
      laps: [ 1, Validators.required],
    });
  }

  ionViewWillEnter(): void {
    this.result = assertExists(this.resultQuery.getActive());
    this.form.patchValue(this.result);
  }

  canDeactivate(): boolean {
    return !this.form.dirty;
  }

  cancel() {
    this.router.navigate(['/results']);
  }

  save() {
    if (this.result) {
      this.resultService.update(this.result.id, this.form.value);
    } else {
      this.resultService.add(this.form.value);
    }
    this.form.reset();
    this.router.navigate(['/results']);
  }

  delete() {
    this.result = assertExists(this.result);

    this.resultService.remove(this.result.id);
    this.form.reset();
    this.router.navigate(['/results']);
  }
}

