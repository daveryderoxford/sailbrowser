import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, PopoverController } from '@ionic/angular';
import { Race } from 'app/model/race';
import { Observable } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';
import { RaceSeries } from '../store/race-series.model';
import { RaceSeriesQuery } from '../store/race-series.query';
import { RaceSeriesService } from '../store/race-series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent {

  series$!: Observable<RaceSeries | undefined>;

  constructor(private service: RaceSeriesService,
    private query: RaceSeriesQuery,
    public popoverController: PopoverController,
    private router: Router,
    private alertCntl: AlertController) {

  }

  ionViewWillEnter() {

    this.service.syncCollection().subscribe();

    this.series$ = this.query.selectActive().pipe(
      filter(val => val !== undefined)
    );
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
