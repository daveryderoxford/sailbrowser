import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Club } from 'app/clubs/@store/club.model';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { assertExists } from 'app/utilities/misc';
import { Observable } from 'rxjs';
import { createSeries, RaceSeries } from '../@store/race-series.model';
import { RaceSeriesQuery } from '../@store/race-series.query';
import { RaceSeriesService } from '../@store/race-series.service';

@Component({
  selector: 'app-series-edit',
  templateUrl: './series-edit.component.html',
  styleUrls: ['./series-edit.component.scss']
})
export class SeriesEditComponent {

  form: FormGroup;
  activeObject: RaceSeries | undefined;
  club$!: Observable<Club | undefined>;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private service: RaceSeriesService,
    private query: RaceSeriesQuery,
    private clubsQuery: ClubsQuery) {

        this.form = this.formBuilder.group({
          name: ['', Validators.required],
          fleetId: ['', Validators.required]
        });
    }

    ionViewWillEnter(): void {

      this.club$ = this.clubsQuery.selectActive();

      this.activeObject = this.query.getActive();

      if (this.activeObject) {
        this.form.patchValue( this.activeObject );
      } else {
        this.form.patchValue(this.createSeries());
      }
    }

    createSeries() {

      const club = this.clubsQuery.getActive() as Club;

      const series: Partial<RaceSeries> = {
        scoringScheme: club.defaultScoringScheme;
      }
      return createSeries(series);
    }

    canDeactivate(): boolean {
      return !this.form.dirty;
    }

    cancel() {
      this.navigateBack();
    }

    save() {
      if (this.activeObject) {
        this.service.update(this.activeObject.id, this.form.value);
      } else {
        this.service.add( createSeries(this.form.value));
      }
      this.form.reset();
      this.navigateBack();
    }

    delete() {
      this.activeObject = assertExists(this.activeObject);

      this.service.remove(this.activeObject.id);
      this.form.reset();
      this.router.navigate(['/races/series/list']);
    }

    navigateBack() {
      if ( this.activeObject) {
        this.router.navigate(['/races/series/display']);
      } else {
        this.router.navigate(['/races/series/list']);
      }
    }
  }



