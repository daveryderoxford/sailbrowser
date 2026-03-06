import { Component, inject, input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Boat as RaceCompetitor } from 'app/boats';
import { ClubService } from '../../../club-tenant';

@Component({
  selector: 'app-entry-edit',
  imports: [],
  templateUrl: './entry-edit.html',
  styles: ``,
})
export class EntryEdit {
  cs = inject(ClubService);

  boat = input<RaceCompetitor | undefined>();

  busy = input<boolean>(false);
 

  form = new FormGroup({
    boatClass: new FormControl('', { validators: [Validators.required] }),
    sailNumber: new FormControl<Number>(0, { validators: [Validators.required, Validators.min(0)] }),
    name: new FormControl(''),
    helm: new FormControl(''),
    crew: new FormControl(''),
    isClub: new FormControl<boolean>(false),
  });


}
