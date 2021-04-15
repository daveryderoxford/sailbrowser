import { TestBed } from '@angular/core/testing';
import { createSeries, createRace } from './race-series.model';
import { RaceSeriesService } from './race-series.service';
import { RaceSeriesStore } from './race-series.store';

const testSeries = createSeries({
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

describe('RacesService', () => {
  let racesService: RaceSeriesService;
  let racesStore: RaceSeriesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaceSeriesService, RaceSeriesStore],
      imports: [ ]
    });

    racesService = TestBed.inject(RaceSeriesService);
    racesStore = TestBed.inject(RaceSeriesStore);
  });

  it('should be created', () => {
    expect(racesService).toBeDefined();
  });

});
