import { Component, OnInit } from '@angular/core';
import { Boat } from 'app/boats';
import { Club } from 'app/clubs/@store/club.model';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { createRaceResult, createSeriesCometitor as createSeriesCompetitor, RaceResult, SeriesCompetitor } from 'app/competitor/@store/competitor.model';
import { CompetitorQuery } from 'app/competitor/@store/competitor.query';
import { CompetitorService } from 'app/competitor/@store/competitor.service';
import { boatClassHandicap } from 'app/model/boat-class';
import { Fleet } from 'app/model/fleet';
import { Race } from 'app/model/race';
import { RaceSeriesQuery } from 'app/race-series/@store/race-series.query';
import { RatingSystem } from 'app/scoring/handicap';
import { SystemDataQuery } from 'app/system-data/@store/system-data.query';
import { RaceSeries } from '../../race-series/@store/race-series.model';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss']
})
export class EnterComponent implements OnInit {
  dirty = false;
  club!: Club;
  races: Race[] = [];
  boat: Boat | undefined = undefined;
  competitors: SeriesCompetitor[] = [];

  constructor(private clubQuery: ClubsQuery,
    private systemDataQuery: SystemDataQuery,
    private seriesQuery: RaceSeriesQuery,
    private competitorQuery: CompetitorQuery,
    private competitorService: CompetitorService) { }

  ngOnInit(): void {
  }

  ionViewWillEnter(): void {
    this.club = this.clubQuery.getActive() as Club;
    this.dirty = false;
    this.races = [];
    this.boat = undefined;
  }

  canDeactivate(): boolean {
    return !this.dirty;
  }

  selectRaces(races: Race[]) {
    this.races = races;
    this.dirty = true;
  }

  async selectBoat(boat: Boat) {
    this.boat = boat;

    // Look for competitor in the race series.  Get Race competitors for the series.
    // If found then add series competitor to race.
    // if not the create a new series competitor
    this.competitors = [];

    for (let race of this.races) {
      const series = this.seriesQuery.getEntity(race.seriesId) as RaceSeries;

      const comp = await this.competitorService.find(race.seriesId, this.boat.id);
      if (!comp) {
        const comp = createSeriesCompetitor({
          seriesId: race.seriesId,
          raceId: race.id,
          boatId: boat.id,
          helm: boat.helm,
          crew: boat.crew,
          boatClass: boat.sailingClass,
          sailnumber: boat.sailNumber,
          handicap: this.getHandicap(boat, this.getRatingScheme(series.fleetId)),
        });
      }
      this.competitors.push(comp);

      let entry = createRaceResult({
        raceId: comp.raceId,
        seriesCompetitorId: comp.seriesId,
        handicap: comp.handicap
      }) as RaceResult;

      comp.results.push(entry);

    }
  }

  getRatingScheme(fleetId: string): RatingSystem {
    return (this.clubQuery.fleet(fleetId) as Fleet).handicapScheme;
  }

  getHandicap(boat: Boat, scheme: RatingSystem): number {

    // Handicap from boat
    let handicap = boat.handicaps.find(hcap => hcap.scheme === scheme);

    // Handicap from club
    if (!handicap) {
      handicap = boatClassHandicap(this.club.boatClasses, boat.sailingClass, scheme)
    }

    // Default from system data
    if (!handicap) {
      handicap = boatClassHandicap(this.systemDataQuery.boatClasses, boat.sailingClass, scheme)
    }

    if (!handicap || !handicap.value) return 0
    return handicap.value;
  }

  /** Save the entries */
  saveEntries() {
    this.competitorService.upsert(this.competitors);
  }

  /** Edit the entry if the rece details */
  editSeriesEntry() {

  }

  selectChange(e: any) {
    console.log(e);
  }

}
