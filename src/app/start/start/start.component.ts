import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { interval, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { SequenceState, StartTimerService } from '../starttime.service';

export interface FlagRow {
  time: Date;
  fleetStart: string;
  classUp: string;
  classDown: string;
  prepUp: boolean;
  prepDown: boolean;
}

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})

export class StartComponent implements OnInit {
  state!: SequenceState;
  flagrows: FlagRow[] = [];
  nextStart: Date = new Date();
  nextFlag!: Date;
  isRunning = false;
  isPostponed = false;
  realTime$: Observable<string>;

  constructor(private alertCntl: AlertController, private startTimer: StartTimerService) {
    this.realTime$ = interval(1000).pipe(
      map( () => new Date().toLocaleTimeString())
    );
  }

  ngOnInit() {
    this.startTimer.countDownToNextStart().subscribe((update) => {
      this.isRunning = (update.state === SequenceState.running);
      this.state = update.state;
    });
  }

  startSequenceClicked() {
    this.startTimer.runStartSequence();
  }

  async stopSequenceClicked() {
    const confirm = await this.alertCntl.create({
      header: 'Stop start sequence?',
      buttons: [
        {
          text: 'Stop',
          handler: () => {
            console.log('Stop start sequence');
            this.startTimer.stopStartSequence();
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
            this.startTimer.postponeStart(0);
          }
        }, {
          text: '1 hour',
          handler: () => {
            this.startTimer.postponeStart(60);
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
    if (this.state === SequenceState.running) {

      const actionSheet = await this.alertCntl.create({
        header: 'Confirm General Recall',
        buttons: [
          {
            text: 'Start same fleet again',
            role: 'destructive',
            handler: () => {
              this.startTimer.generalRecall(false);
            }
          }, {
            text: 'Send Fleet to End',
            role: 'destructive',
            handler: () => {
              this.startTimer.generalRecall(true);
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

  /** Update the flag rows when a start timer expires */
  calculateFlagRows() {

  }
}

