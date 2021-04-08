import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-scoring-scheme-edit',
  templateUrl: './scoring-scheme-edit.component.html',
  styleUrls: ['./scoring-scheme-edit.component.css']
})
export class ScoringSchemeEditComponent implements OnInit {
  public formGroup1!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  createGroup() {
    this.formGroup1 = this.fb.group({
      scheme: ['', Validators.required],
      discards: this.fb.group({
        initialDiscardAfter: [3, Validators.required],
        subsequentDiscardsEveryN: [2, Validators.required]
      }),
      ood: this.fb.group({
        algorithm: ['', Validators.required],
        maxPerSeries: [2, Validators.required]
      })
    });

    return this.formGroup1;
  }
}
