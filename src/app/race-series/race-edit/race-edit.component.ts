import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubsQuery } from 'app/clubs/store/clubs.query';
import { Race, raceStates } from 'app/model/race';
import { assertExists } from 'app/utilities/misc';
import { add, set } from 'date-fns';
import { createRace, RaceSeries } from '../store/race-series.model';
import { RaceSeriesQuery } from '../store/race-series.query';
import { RaceSeriesService } from '../store/race-series.service';


@Component({
  selector: 'app-race-edit',
  templateUrl: './race-edit.component.html',
  styleUrls: ['./race-edit.component.css']
})
export class RaceEditComponent {

  form: FormGroup;
  series!: RaceSeries;
  activeObject!: Race | null;

  states = raceStates;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private service: RaceSeriesService,
    private query: RaceSeriesQuery,
    private clubsQuery: ClubsQuery) {

    this.form = this.formBuilder.group({
      scheduledStart: ['', Validators.required],
      startType: ['', Validators.required],
      status: ['', Validators.required],
      isDiscardable: ['', Validators.required],
      startNumber: ['', Validators.required],
    });
  }

  ionViewWillEnter(): void {

    this.series = this.query.getActive() as RaceSeries;
    this.activeObject = this.query.getActiveRace();

    if (this.activeObject) {
      this.form.patchValue(this.activeObject);
    } else {
      const race = this.createNewRace();
      this.form.patchValue(race);
    }
  }

  createNewRace(): Partial<Race> {
    if (this.series.races.length > 0) {
      // Create new race with schduled start one week on from last race
      const races = this.series.races;
      const start = add(new Date(races[races.length - 1].scheduledStart), { weeks: 1 });
      return createRace({ scheduledStart: start.toISOString() });
    } else {
      // Create race with schdduled start at 11:00
      const start = set(new Date(), { hours: 11, minutes: 0, seconds: 0, milliseconds: 0 });
      return createRace({ scheduledStart: start.toISOString() });
    }
  }

  canDeactivate(): boolean {
    return !this.form.dirty;
  }

  cancel() {
    this.navigateBack();
  }

  save() {

    if (this.activeObject) {
      this.service.updateRace(this.series, this.activeObject.id, this.form.value);
    } else {
      this.service.addRace(this.series, createRace(this.form.value));
    }
    this.form.reset();
    this.navigateBack();
  }

  delete() {
    this.activeObject = assertExists(this.activeObject);

    this.service.removeRace(this.series, this.activeObject.id);
    this.form.reset();
    this.navigateBack()
  }

  navigateBack() {
    this.router.navigate(['/races/series/display']);
  }

  disableSaveButton() {
    if (this.activeObject) {
      return this.form.invalid || !this.form.dirty;
    } else {
      return this.form.invalid;
    }
  }

}
