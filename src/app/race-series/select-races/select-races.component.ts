import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { Fleet } from 'app/model/fleet';
import { Race } from 'app/model/race';
import { RaceSeriesQuery } from 'app/race-series/@store/race-series.query';
import { isToday } from 'date-fns';
import { remove } from 'lodash-es';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

function filterRaces(races: Race[], filter: RacesFilter) {
  if (filter === 'Today') {
    return races.filter(race => isToday(new Date(race.scheduledStart)));
  } else {
    return races;
  }
}

export type RacesFilter = 'Today' | 'All';

@Component({
  selector: 'app-select-races',
  templateUrl: './select-races.component.html',
  styleUrls: ['./select-races.component.scss']
})
export class SelectRacesComponent implements OnInit {

  @Input() filter = '';
  @Input() races: Race[] = [];
  @Output() raceSelected = new EventEmitter<Race[]>();

  races$: Observable<Race[]>;
  filter$ = new BehaviorSubject<RacesFilter>('Today');
  fleets: Fleet[] = [];

  constructor(query: RaceSeriesQuery, private clubsQuery: ClubsQuery) {
    this.races$ = combineLatest([query.races$.pipe(startWith([])), this.filter$]).pipe(
      map(([races, filter]) => filterRaces(races, filter))
    );
  }

  ngOnInit(): void {
    this.fleets = this.clubsQuery.fleets;
  }

  displayAll() {
    this.filter$.next('All');
  }

  checkboxClick(race: Race, e: any) {
    const checked = e.detail.checked;
    if (checked) {
      this.races.push(race);
    } else {
      remove(this.races, r => r === race);
    }
    this.raceSelected.emit(this.races);
}

isSelected(race: Race) {
  return this.races.some( r => r.id = race.id);
 }

}
