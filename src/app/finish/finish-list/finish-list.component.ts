import { Component, OnInit } from '@angular/core';
import { CompetitorService } from 'app/competitor/@store/competitor.service';
import { Result } from 'app/competitor/@store/result.model';
import { ResultQuery } from 'app/competitor/@store/result.query';
import { ResultService } from 'app/competitor/@store/result.service';
import { FleetNamePipe } from 'app/shared/pipes/fleet-name.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-finish-list',
  templateUrl: './finish-list.component.html',
  styleUrls: ['./finish-list.component.scss']
})
export class FinishListComponent implements OnInit {

  racing$: Observable<Result[]>;
  finished$: Observable<Result[]>;
  approaching: Result[] = [];

  segment = 'fleet';

  constructor(private resultService: ResultService,
                resultsQuery: ResultQuery) {
                this.racing$ = resultsQuery.racing$;
                this.finished$ = resultsQuery.finished$;
  }

  ngOnInit(): void {
  }

  log( action: string, result: Result) {
    console.log( action + ': '  + result.id + ' ' + result.helm );
  }

  lap(result: Result) {
    this.resultService.addLap(result.id, result.laps, result.lapTimes);
    this.removeApproaching(result);
    this.log('lap', result);
  }

  finish(result: Result) {
    const finishtime = new Date().toISOString();
    this.resultService.update(result.id, {resultCode: 'OK', finishTime: finishtime} );
    this.removeApproaching(result);
    this.log('finish', result);
  }

  top(result: Result) {
    this.approaching = [result, ...this.approaching];
    this.log('top', result);
  }

  addApproaching(result: Result) {
    this.approaching = [...this.approaching, result];
    this.log('approaching', result);
  }

  removeApproaching(result: Result) {
    this.approaching = this.approaching.filter( res => res.id !== result.id);
  }

  retired(result: Result) {
    this.resultService.update(result.id, {resultCode: 'RET'} );
    this.removeApproaching(result);
  }

  didNotStart(result: Result) {
    this.resultService.update(result.id, {resultCode: 'DNS'} );
    this.removeApproaching(result);
  }

  stillRacing(result: Result) {
    this.resultService.update(result.id, {resultCode: 'NotFinished', finishTime: ''} );
  }

  viewChanged(ev: any) {
    const option = ev.detail.value;
    this.segment = option;
    if (this.segment !== 'finished') {
       this.resultService.setUISortOrder(option);
    }
  }

  /** Private calculated the extected time competitors will cross the line.
   * At the start, this is based on start time and handicap.
   * Once a lap is completed it is based on avarage time of previous laps plus last start time.
   * Assume default lap time.
   */
  calculatedExpctedTime(result: Result) {

    if (result.laps === 0) {

    } else {


    }


  }

}
