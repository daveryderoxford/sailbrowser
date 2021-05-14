import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { interval, Subscription } from 'rxjs';
import { StartQuery } from '../@store/start.query';
import { StartService } from '../@store/start.service';
import { StartState, StartStatus } from '../@store/start.store';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})

export class StartComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;

  realTime: Date | undefined = undefined;
  nextFlagTime: Date | undefined = undefined;
  nextRaceStartTime: Date | undefined = undefined;

  state: StartState | undefined;
  isRunning = false;

  constructor(private alertCntl: AlertController,
    private startService: StartService,
    startQuery: StartQuery) {

    this.sub1 = interval(1000).subscribe(count => {
      this.realTime = new Date();

      if (this.state && this.realTime && this.isRunning)  {
        this.nextFlagTime = new Date(this.state.flagTimes[0].time.getTime() - this.realTime.getTime());
        const racetime = new Date(this.state.races[0].actualStart);
        this.nextRaceStartTime = new Date(racetime.getTime() - this.realTime.getTime());
      } else {
        this.nextFlagTime = undefined;
        this.nextRaceStartTime = undefined;
      }

    });

    this.sub2 = startQuery.select().subscribe(state => {
      this.state = state;
      this.isRunning = (state.state === StartStatus.running);
    });
  }

  ngOnInit() {

  }

  ionViewWillEnter() {

  }

  startSequenceClicked() {
    this.startService.runStartSequence('NextMinute');
  }

  async stopSequenceClicked() {
    const confirm = await this.alertCntl.create({
      header: 'Stop start sequence?',
      buttons: [
        {
          text: 'Stop',
          handler: () => {
            console.log('Stop start sequence');
            this.startService.stopStartSequence();
          }
        },
        {
          text: 'Keep Running',
          handler: () => {
            console.log('Stop start sequence canceled');
          }
        }
      ]
    });
    confirm.present();
  }

  async postponeClicked() {
    const actionSheet = await this.alertCntl.create({
      header: 'Postpone Start',
      buttons: [
        {
          text: 'Indefinite',
          role: 'destructive',
          handler: () => {
            this.startService.postponeStart(0);
          }
        }, {
          text: '1 hour',
          handler: () => {
            this.startService.postponeStart(60);
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  async recallClicked() {
    if (this.isRunning) {

      const actionSheet = await this.alertCntl.create({
        header: 'Confirm General Recall',
        buttons: [
          {
            text: 'Start same fleet again',
            role: 'destructive',
            handler: () => {
              this.startService.generalRecall(false);
            }
          }, {
            text: 'Send Fleet to End',
            role: 'destructive',
            handler: () => {
              this.startService.generalRecall(true);
            }
          }, {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}

