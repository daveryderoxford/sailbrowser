import { TestBed } from '@angular/core/testing';
import { RaceSeriesService } from './race-series.service';
import { RaceSeriesStore } from './race-series.store';

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
