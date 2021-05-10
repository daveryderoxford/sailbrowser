import { TestBed } from '@angular/core/testing';
import { createRace } from 'app/race-series/@store/race-series.model';
import { RaceSeriesQuery } from 'app/race-series/@store/race-series.query';
import { RaceSeriesService } from 'app/race-series/@store/race-series.service';
import { StartQuery } from './start.query';
import { StartService } from './start.service';
import { StartFlagSequence, StartStore } from './start.store';

const races = [
  createRace({ id: 'S1race1', seriesId: 'S1', scheduledStart: '2020-01-01', }),
  createRace({ id: 'S2race1', seriesId: 'S2', scheduledStart: '2020-01-01', }),
  createRace({ id: 'S3race3', seriesId: 'S3', scheduledStart: '2020-02-01', }),
  createRace({ id: 'race4', seriesId: '123abc', scheduledStart: '2020-02-01', }),
  createRace({ id: 'race5', seriesId: '123abc', scheduledStart: '2020-03-01', }),
  createRace({ id: 'race6', seriesId: '123abc', scheduledStart: '2020-03-01', }),
];

const isafSequence: StartFlagSequence = {
  classUp: 5,
  prepUp: 4,
  prepDown: 1,
  classDown: 0
}

const twoMinSequence: StartFlagSequence = {
  classUp: 4,
  prepUp: 2,
  prepDown: 0,
  classDown: 0
}

let startService: StartService;
let startStore: StartStore;
let startQuery: StartQuery;
let raceSeriesService: RaceSeriesService;
let raceSeriesQuery: RaceSeriesQuery;

beforeAll(() => {
  jasmine.clock().install;
});

afterAll(() => {
  jasmine.clock().uninstall;
});

beforeEach(() => {
  const raceSeriesServiceSpy = jasmine.createSpyObj('RaceSeriesService', ['updateRace']);
  const raceSeriesQuerySpy = jasmine.createSpyObj('RaceSeriesQuery', ['getEntity']);

  TestBed.configureTestingModule({
    // Provide both the service-to-test and its (spy) dependency
    providers: [
      StartService,
      StartStore,
      StartQuery,
      { provide: RaceSeriesService, useValue: raceSeriesServiceSpy },
      { provide: RaceSeriesQuery, useValue: raceSeriesQuerySpy }
    ]
  });

  // Inject both the service-to-test and its (spy) dependency
  startService = TestBed.inject(StartService);
  startStore = TestBed.inject(StartStore);
  startQuery = TestBed.inject(StartQuery);
  raceSeriesService = TestBed.inject(RaceSeriesService) as jasmine.SpyObj<RaceSeriesService>;
  raceSeriesQuery = TestBed.inject(RaceSeriesQuery) as jasmine.SpyObj<RaceSeriesQuery>;
});

describe('StartService', () => {

  it('should create', () => {
    expect(startService).toBeTruthy();
  });

  it('Should new start to be set, specifying races', () => {
    startService.resetSequence(races, isafSequence);
    const s = startQuery.getValue();
    expect(s.races.length).toEqual(6);
    expect(s.races).toEqual(races);
    expect(s.sequence).toEqual(isafSequence);
  });

  it('should set the start times for races correctly', () => {
    //Set time to 30 seconds

    // Add using isaf seqience
    startService.resetSequence(races, isafSequence);

    // Check that actual start times are correct based on sequence
   

    // Check that flags are as expected


  });

  it('should update flags when a flag time is due', () => {
  });

  it('should fire start at the correct time', () => {
  });

  it('should beep at the correct times', () => {
  });

});
