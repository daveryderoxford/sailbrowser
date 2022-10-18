import { DefaultIterableDiffer, Injectable } from '@angular/core';
import { combineQueries, QueryEntity } from '@datorama/akita';
import { compareAsc } from 'date-fns';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { Result } from './result.model';
import { ResultStore, ResultState } from './result.store';

function activeRaces(raceIds: string[], results: Result[]): Result[] {
   const ret = results.filter( race => raceIds.some( id => race.id === id ));
   return ret;
}

/** Sort finish times.
 * If the finish time is unset then it is at the end.
 */
function sortByFinishTime(a: Result, b: Result): number {
  if (a.finishTime === '') {
    return 1;
  } else if (b.finishTime === '') {
    return 1;
  } else {
    const adate = new Date(a.finishTime);
    const bdate = new Date(b.finishTime);
    return compareAsc(adate, bdate);
  }
}

@Injectable({ providedIn: 'root' })
export class ResultQuery extends QueryEntity<ResultState> {

  /** Results for races currently active */
  activeResults$ = combineQueries( [this.select('activeRaceIds'), this.selectAll()]).pipe(
    map( ([raceIds, results]) => activeRaces(raceIds, results) ),
    distinctUntilChanged(),
    shareReplay()
  );

  /** Results for  */
  racing$ = this.activeResults$.pipe(
    map( results => results.filter( result => result.resultCode ==='NotFinished' ))
  );

  /** Results for finished comprtitors sorted by finish time */
  finished$ = this.activeResults$.pipe(
    map( results => results.filter( result => result.resultCode !=='NotFinished' ).sort( (a,b) => sortByFinishTime(a,b) ) )
  );

  constructor(protected store: ResultStore) {
    super(store);
  }

  /** Return active results */
  activeResults(): Result[] {
    const results = this.getAll( {
      filterBy: result => this.getValue().activeRaces.some( id => result.raceId === id )
    } );
    return results;
  }
}
