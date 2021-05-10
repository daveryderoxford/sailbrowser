import { Component, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { Fleet } from 'app/model/fleet';
import { Race } from 'app/model/race';
import { cloneDeep } from 'lodash-es';
import { createRace, createSeries, RaceSeries } from '../@store/race-series.model';
import { RaceSeriesQuery } from '../@store/race-series.query';
import { RaceSeriesService } from '../@store/race-series.service';

@Component({
  selector: 'app-copy-series',
  templateUrl: './copy-series.component.html',
  styleUrls: ['./copy-series.component.scss']
})
export class CopySeriesComponent implements OnInit {
  form: FormGroup;
  fleets: Fleet[] | undefined = [];
  baseSeries!: RaceSeries;

  constructor(private router: Router,
    fb: FormBuilder,
    private service: RaceSeriesService,
    private query: RaceSeriesQuery,
    private clubsQuery: ClubsQuery) {

      this.form = fb.group({
        fleet: ['', Validators.required],
      });

    }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.fleets = this.clubsQuery.fleets;
    this.baseSeries = this.query.getActive()!;
  }

  canDeactivate(): boolean {
    return !this.form.dirty;
  }

  async save() {

    const newSeries = createSeries( {
      name: this.baseSeries.name,
      fleetId: this.form.value.fleet,
      scoringScheme: cloneDeep(this.baseSeries.scoringScheme),
    });

     newSeries.id = await this.service.add(newSeries)

    // Add races to new series
    const newRaces: Race[] = [];
    for (let race of this.baseSeries.races) {
      newRaces.push( createRace({
        scheduledStart: race.scheduledStart,
        type: race.type,
        status: race.status,
        isDiscardable: race.isDiscardable,
        startNumber: race.startNumber
      }));
    }

    this.service.addRaces(newSeries, newRaces);

    this.service.setActive(newSeries.id);
    this.form.reset();
    this.navigateBack();
  }

  cancel() {
    this.navigateBack();
  }

  navigateBack() {
    this.router.navigate(['/races/series/display'])
  }

}
