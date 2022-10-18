import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Boat } from 'app/boats';
import { Club } from 'app/clubs/@store/club.model';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { createCompetitor, Competitor } from 'app/competitor/@store/competitor.model';
import { CompetitorQuery } from 'app/competitor/@store/competitor.query';
import { CompetitorService } from 'app/competitor/@store/competitor.service';
import { Result, createResult } from 'app/competitor/@store/result.model';
import { ResultService } from 'app/competitor/@store/result.service';
import { boatClassHandicap } from 'app/model/boat-class';
import { Fleet } from 'app/model/fleet';
import { Race } from 'app/model/race';
import { RaceSeriesQuery } from 'app/race-series/@store/race-series.query';
import { RatingSystem } from 'app/scoring/scoring';
import { IonicStepperComponent } from 'app/shared/stepper/ionic-stepper';
import { SystemDataQuery } from 'app/system-data/@store/system-data.query';
import { assertExists } from 'app/utilities/misc';
import { RaceSeries } from '../../race-series/@store/race-series.model';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss']
})
export class EnterComponent implements OnInit {

  @ViewChild(IonicStepperComponent) stepper!: IonicStepperComponent;

  raceStep = 0;
  boatStep = 1;
  confirmStep = 2;

  dirty = false;
  club!: Club;
  races: Race[] = [];
  boat: Boat | undefined = undefined;
  competitors: Competitor[] = [];
  results: Result[] = [];

  constructor(private clubQuery: ClubsQuery,
    private systemDataQuery: SystemDataQuery,
    private seriesQuery: RaceSeriesQuery,
    private competitorQuery: CompetitorQuery,
    private competitorService: CompetitorService,
    private resultsService: ResultService,
    private alertController: AlertController) { }

  ngOnInit(): void {
  }

  reset() {
    this.dirty = false;
    this.races = [];
    this.boat = undefined;
    this.competitors = [];
  }

  ionViewWillEnter(): void {
    this.club = this.clubQuery.getActive() as Club;
    this.reset();
  }

  canDeactivate(): boolean {
    return !this.dirty;
  }

  selectRaces(races: Race[]) {
    this.races = races;
    this.dirty = true;
  }

  async selectBoat(): Promise<boolean> {

    // Look for competitor in the race series.  Get Race competitors for the series.
    // If found then add series competitor to race.
    // if not the create a new series competitor
    this.competitors = [];
    const boat = assertExists(this.boat);

    for (const race of this.races) {
      const series = this.seriesQuery.getEntity(race.seriesId) as RaceSeries;

      let comp = await this.competitorService.find(race.seriesId, boat.id);
      if (!comp) {
        comp = createCompetitor({
          seriesId: race.seriesId,
          boatId: boat.id,
          helm: boat.helm,
          crew: boat.crew,
          boatClass: boat.sailingClass,
          sailNumber: boat.sailNumber,
          handicap: this.getHandicap(boat, this.getFleet(series.fleetId).handicapScheme),
        });
      }

      const entry = createResult({
        raceId: race.id,
        seriesCompetitorId: comp.seriesId,
        helm: comp.helm,
        crew: comp.crew,
        boatClass: comp.boatClass,
        sailNumber: comp.sailNumber,
        handicap: comp.handicap
      }) as Result;

      // Check the competitor is not already entered for the race
     // const duplicate = comp.some(result => result.boatId === boat.id);

       const duplicate = false;

      if (duplicate) {
        await this.duplicateCompetitorAlert(comp, race);
      } else {
        this.competitors.push(comp);
        this.results.push(entry);
      }
    }

    return this.competitors.length !== 0;
  }

  getFleet(fleetId: string): Fleet {
    return (this.clubQuery.fleet(fleetId) as Fleet);
  }

  getHandicap(boat: Boat, scheme: RatingSystem): number {

    // Handicap from boat
    let handicap = boat.handicaps.find(hcap => hcap.scheme === scheme);

    // Handicap from club
    if (!handicap) {
      handicap = boatClassHandicap(this.club.boatClasses, boat.sailingClass, scheme);
    }

    // Default from system data
    if (!handicap) {
      handicap = boatClassHandicap(this.systemDataQuery.boatClasses, boat.sailingClass, scheme);
    }

    if (!handicap || !handicap.value) { return 0; }
    return handicap.value;
  }

  /** Save the entries and reset to take next entry */
  async saveEntries() {
    for (const comp of this.competitors) {
      if (comp.id === '') {
        await this.competitorService.add(comp);
      } else {
        await this.competitorService.update(comp);
      }
    }
    for (const result of this.results) {
      await this.resultsService.update(result);
    }
    this.reset();
    this.stepper.setStep(0);
  }

  /** Edit the entry if the rece details */
  editSeriesEntry() {

  }

  async next() {
    let ok = true;

    if (this.stepper.selectedIndex === this.boatStep) {
     ok = await this.selectBoat();
    }

    if (ok) {
      this.stepper.nextStep();
    }
  }

  previous() {
    this.stepper.previousStep();
  }

  disabled(): boolean {
    const step = this.stepper?.selectedIndex;
    if (step === this.raceStep) {
      return (this.races.length === 0);
    } else if (step === this.boatStep) {
      return (!this.boat);
    } else {
      return false;
    }
  }

  async duplicateCompetitorAlert(comp: Competitor, race: Race) {

    const alert = await this.alertController.create({
      header: 'Duplicate Entry',
      message: `Duplicate entry for ${comp.boatClass} ${comp.sailNumber}
in  ${this.getFleet(race.fleetId).name} - ${race.name} `,
      buttons: ['OK']
    });

    await alert.present();
    await alert.onDidDismiss();
  }
}
