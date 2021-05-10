import { TestBed } from '@angular/core/testing';
import { ClubsQuery } from 'app/clubs/@store/clubs.query';
import { of } from 'rxjs';
import { createSeries, createRace } from './race-series.model';
import { RaceSeriesQuery } from './race-series.query';
import { RaceSeriesService } from './race-series.service';
import { RaceSeriesStore } from './race-series.store';


const testSeries2 = createSeries({
  id: '123abc',
  name: 'Summer',
  fleetId: 'Fast Handicap',
  startDate: '2020-01-01',
  endDate: '2020-03-01',
  races: [
    createRace({ id: 'race1', seriesId: '123abc', scheduledStart: '2020-01-01', }),
    createRace({ id: 'race2', seriesId: '123abc', scheduledStart: '2020-01-01', }),
    createRace({ id: 'race3', seriesId: '123abc', scheduledStart: '2020-02-01', }),
    createRace({ id: 'race4', seriesId: '123abc', scheduledStart: '2020-02-01', }),
    createRace({ id: 'race5', seriesId: '123abc', scheduledStart: '2020-03-01', }),
    createRace({ id: 'race6', seriesId: '123abc', scheduledStart: '2020-03-01', }),
  ]
});

let racesService: RaceSeriesService;
let racesStore: RaceSeriesStore;
let racesQuery: RaceSeriesQuery;
let clubQuery: ClubsQuery;

const raceSeriesStoreSpy = jasmine.createSpyObj('RaceSeriesStore', ['update']);
const clubsQuerySpy = jasmine.createSpyObj('ClubsQuery', ['getActiveId','selectActiveId']);

describe('RacesSeriesService', () => {

  beforeEach(() => {

    clubsQuerySpy.selectActiveId.and.returnValue(of('TestClub'));
    clubsQuerySpy.getActiveId.and.returnValue('TestClub');

    TestBed.configureTestingModule({
      providers: [
        RaceSeriesService,
        RaceSeriesStore,
        RaceSeriesQuery,
        { provide: ClubsQuery, useValue: clubsQuerySpy },
      ]
    });

    racesService = TestBed.inject(RaceSeriesService);
    racesStore = TestBed.inject(RaceSeriesStore);
    racesQuery = TestBed.inject(RaceSeriesQuery);
    clubQuery = TestBed.inject(ClubsQuery) as jasmine.SpyObj<ClubsQuery>;

  });

  it('should be created', () => {
    expect(racesService).toBeDefined();
  });
});
