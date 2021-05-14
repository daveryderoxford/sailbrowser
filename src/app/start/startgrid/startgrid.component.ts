import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { Fleet } from 'app/model/fleet';
import { Race } from 'app/model/race';
import { StartFlagTiming } from '../@store/start.store';

@Component({
  selector: 'app-startgrid',
  templateUrl: './startgrid.component.html',
  styleUrls: ['./startgrid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StartgridComponent implements OnInit, OnChanges {
  @Input() flags: StartFlagTiming[] | undefined = [];
  @Input() races: Race[] | undefined = [];

  fleets: Fleet[] = [];
  displayedFlags: StartFlagTiming[] = [];

  constructor(private clubsQuery: ClubsQuery) {}

  ngOnInit(): void {
    this.fleets = this.clubsQuery.fleets;
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const flags in changes) {
      if (this.flags) {
         this.displayedFlags = this.flags.slice(0,2);
      }
    }
  }

  getFleet(race: Race | undefined): Fleet {
    const fleet = this.fleets.find( f => race?.fleetId === f.id) as Fleet;
    console.log('fleet: ' + JSON.stringify(fleet));
    return fleet;
  }
}
