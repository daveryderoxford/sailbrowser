import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { Fleet } from 'app/model/fleet';
import { Race } from 'app/model/race';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RaceSeries } from '../@store/race-series.model';
import { RaceSeriesQuery } from '../@store/race-series.query';
import { RaceSeriesService } from '../@store/race-series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent {

  series$!: Observable<RaceSeries | undefined>;
  fleets: Fleet[] = [];

  constructor(private service: RaceSeriesService,
    private query: RaceSeriesQuery,
    private clubsQuery: ClubsQuery,
    public popoverController: PopoverController,
    private router: Router,
    private alertCntl: AlertController) {

  }

  ionViewWillEnter() {

    this.service.syncCollection().subscribe();

    this.series$ = this.query.selectActive().pipe(
      filter(val => val !== undefined)
    );

    this.fleets = this.clubsQuery.fleets;
  }

  editSeriesDetails() {
    this.router.navigate(['races/series/edit']);
  }

  addSeries() {
    this.service.setActive(null);
    this.router.navigate(['races/series/edit']);
  }

  async deleteSeries(series: RaceSeries) {
    const confirm = await this.alertCntl.create({
      message: 'Delete series?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            console.log('Series: Deleting series');
            this.service.remove(series.id);
            this.router.navigate(['/races'])
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('Delete series canceled');
          }
        }
      ]
    });
    confirm.present();
  }

  copySeries() {
    this.router.navigate(['races/series/copy']);
  }

  addRace() {
    this.service.setActiveRace(null);
    this.router.navigate(['races/race/edit']);
  }

  editRace(race: Race) {
    this.service.setActiveRace(race);
    this.router.navigate(['races/race/edit']);
  }

  copyRace(race: Race) {
    this.service.setActiveRace(race);
    this.router.navigate(['races/race/copy']);
  }


}
