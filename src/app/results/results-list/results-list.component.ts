import { Component, OnInit } from '@angular/core';
import { Result } from 'app/competitor/@store/result.model';
import { ResultQuery } from 'app/competitor/@store/result.query';
import { Race } from 'app/model/race';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss']
})
export class ResultsListComponent implements OnInit {

  races$!: Observable<Race[]>;
  results$: Observable<Result[]>;

  constructor( resultQuery: ResultQuery) {
    //this.races$ = undefined;
    this.results$ = resultQuery.activeResults$;
  }

  ngOnInit(): void {
  }

  /** Publish the results.  An Internet connection is required to publish the results */
  publish() {


  }

}
