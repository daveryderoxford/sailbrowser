import { TestBed } from '@angular/core/testing';
import { RaceScorer } from './race-scorer.tsxxx';
import { RaceCompetitor } from 'app/race/@store/race-competitor';
import { ResultCode } from 'app/race/@store/result-code';
import { Race } from 'app/race-calender/@store/race';

describe('RaceScorer', () => {
  let service: RaceScorer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RaceScorer],
    });
    service = TestBed.inject(RaceScorer);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  const mockRace: Race = {
    id: '1',
    seriesName: 'Series',
    index: 1,
    fleetId: 'fleet',
    seriesId: 'series',
    scheduledStart: new Date('2023-01-01T10:00:00'),
    raceOfDay: 1,
    type: 'Conventional',
    status: 'Completed',
    isDiscardable: true,
    isAverageLap: false,
  };

  const startTime = new Date('2023-01-01T10:00:00');

  it('should calculate results for level rating', () => {
    const c1 = new RaceCompetitor({
      id: '1',
      startTime: startTime,
      manualFinishTime: new Date('2023-01-01T10:10:00'), // 600s
      resultCode: ResultCode.Ok,
      handicap: 1000,
    });
    const c2 = new RaceCompetitor({
      id: '2',
      startTime: startTime,
      manualFinishTime: new Date('2023-01-01T10:20:00'), // 1200s
      resultCode: ResultCode.Ok,
      handicap: 1000,
    });

    const results = service.calculateRaceResults([c1, c2], 'Level Rating', mockRace);

    expect(results[0].id).toBe('1');
    expect(results[0].result?.points).toBe(1);
    expect(results[0].result?.correctedTime).toBe(600000);

    expect(results[1].id).toBe('2');
    expect(results[1].result?.points).toBe(2);
    expect(results[1].result?.correctedTime).toBe(1200000);
  });

  it('should calculate results for PY', () => {
    const c1 = new RaceCompetitor({
      id: '1',
      startTime: startTime,
      manualFinishTime: new Date('2023-01-01T10:10:00'), // 600s
      resultCode: ResultCode.Ok,
      handicap: 1200, // Slower boat
    });
    const c2 = new RaceCompetitor({
      id: '2',
      startTime: startTime,
      manualFinishTime: new Date('2023-01-01T10:10:00'), // 600s
      resultCode: ResultCode.Ok,
      handicap: 1000, // Faster boat
    });

    // c1 corrected: 600 * 1000 / 1200 = 500
    // c2 corrected: 600 * 1000 / 1000 = 600

    const results = service.calculateRaceResults([c1, c2], 'PY', mockRace);

    expect(results[0].id).toBe('1');
    expect(results[0].result?.points).toBe(1);
    expect(results[0].result?.correctedTime).toBe(500000);

    expect(results[1].id).toBe('2');
    expect(results[1].result?.points).toBe(2);
    expect(results[1].result?.correctedTime).toBe(600000);
  });

  it('should handle ties', () => {
    const c1 = new RaceCompetitor({
      id: '1',
      startTime: startTime,
      manualFinishTime: new Date('2023-01-01T10:10:00'),
      resultCode: ResultCode.Ok,
      handicap: 1000,
    });
    const c2 = new RaceCompetitor({
      id: '2',
      startTime: startTime,
      manualFinishTime: new Date('2023-01-01T10:10:00'),
      resultCode: ResultCode.Ok,
      handicap: 1000,
    });

    const results = service.calculateRaceResults([c1, c2], 'Level Rating', mockRace);

    expect(results[0].result?.points).toBe(1.5);
    expect(results[1].result?.points).toBe(1.5);
  });

  it('should handle non-finishers (DNF)', () => {
    const c1 = new RaceCompetitor({
      id: '1',
      startTime: startTime,
      manualFinishTime: new Date('2023-01-01T10:10:00'),
      resultCode: ResultCode.Ok,
    });
    const c2 = new RaceCompetitor({
      id: '2',
      startTime: startTime,
      resultCode: ResultCode.Dnf,
    });

    const results = service.calculateRaceResults([c1, c2], 'Level Rating', mockRace);

    expect(results[0].id).toBe('1');
    expect(results[0].result?.points).toBe(1);

    expect(results[1].id).toBe('2');
    expect(results[1].result?.points).toBe(3); // Starters (2) + 1 = 3
  });

  it('should calculate results for average lap race', () => {
    const avgLapRace = { ...mockRace, isAverageLap: true };
    const c1 = new RaceCompetitor({ // 2 laps in 10 mins, avg 5 min/lap
      id: '1',
      startTime: startTime,
      manualFinishTime: new Date('2023-01-01T10:10:00'), // 600s
      manualLaps: 2,
      resultCode: ResultCode.Ok,
      handicap: 1000,
    });
    const c2 = new RaceCompetitor({ // 3 laps in 12 mins, avg 4 min/lap
      id: '2',
      startTime: startTime,
      manualFinishTime: new Date('2023-01-01T10:12:00'), // 720s
      manualLaps: 3,
      resultCode: ResultCode.Ok,
      handicap: 1000,
    });

    // Max laps is 3.
    // c1 elapsed: (600s / 2 laps) * 3 laps = 900s
    // c2 elapsed: (720s / 3 laps) * 3 laps = 720s
    // c2 is faster.

    const results = service.calculateRaceResults([c1, c2], 'Level Rating', avgLapRace);

    expect(results[0].id).toBe('2');
    expect(results[0].result?.points).toBe(1);
    expect(results[0].result?.correctedTime).toBe(720000); // 720s in ms

    expect(results[1].id).toBe('1');
    expect(results[1].result?.points).toBe(2);
    expect(results[1].result?.correctedTime).toBe(900000); // 900s in ms
  });

  it('should apply ZFP penalty', () => {
    const c1 = new RaceCompetitor({
      id: '1',
      startTime: startTime,
      manualFinishTime: new Date('2023-01-01T10:10:00'), // Finishes 2nd
      resultCode: ResultCode.Ok,
    });
    const c2 = new RaceCompetitor({
      id: '2',
      startTime: startTime,
      manualFinishTime: new Date('2023-01-01T10:09:00'), // Finishes 1st, gets ZFP
      resultCode: ResultCode.Zfp,
    });

    // Order by time: c2, c1.
    // Initial points: c2=1, c1=2.
    // Apply penalty to c2: 1 * 1.2 = 1.2.
    // Final points: c2=1.2, c1=2.
    // Final order by points: c2, c1.

    const results = service.calculateRaceResults([c1, c2], 'Level Rating', mockRace);

    expect(results[0].id).toBe('2');
    expect(results[0].result?.points).toBe(1.2);
    expect(results[1].id).toBe('1');
    expect(results[1].result?.points).toBe(2);
  });

  it('should cap scoring penalty at DSQ points', () => {
    const competitors = [
      new RaceCompetitor({ id: '1', startTime, manualFinishTime: new Date('2023-01-01T10:10:00'), resultCode: ResultCode.Ok }),
      new RaceCompetitor({ id: '2', startTime, manualFinishTime: new Date('2023-01-01T10:15:00'), resultCode: ResultCode.Scp }), // Finishes 2nd, gets penalty
    ];
    // 2 starters. DSQ points = 2 + 1 = 3.
    // c2 gets 2 points. Penalty: 2 * 1.2 = 2.4. This is less than 3, so it's 2.4.
    const results = service.calculateRaceResults(competitors, 'Level Rating', mockRace);
    const c2Result = results.find(r => r.id === '2');
    expect(c2Result?.result?.points).toBe(2.4);
  });
});
