import { RaceCompetitor } from 'app/results-input/@store/race-competitor';
import { Race } from 'app/race-calender/@store/race';
import { scoreRace } from './race-scorer';
import { ResultCode } from 'app/scoring/result-code';

/** Helper to create RaceCompetitor objects for testing */
function createCompetitor(
  id: string,
  finishTimeOffset: number | null,
  resultCode: ResultCode,
  options: Partial<RaceCompetitor> = {}
): RaceCompetitor {
  const startTime = new Date('2024-01-01T10:00:00Z');
  const finishTime = finishTimeOffset !== null ? new Date(startTime.getTime() + finishTimeOffset * 1000) : undefined;

  return {
    id,
    raceId: 'race1',
    seriesId: 'series1',
    helm: `Helm ${id}`,
    sailNumber: 100 + parseInt(id, 10),
    boatClass: 'Test Class',
    handicap: 1000,
    startTime,
    finishTime,
    numLaps: 1,
    manualLaps: 0,
    lapTimes: [],
    resultCode,
    ...options,
  } as RaceCompetitor;
}

describe('RaceScorer', () => {
  const mockRace: Race = {
    id: '1',
    seriesName: 'Series',
    index: 1,
    fleetId: 'fleet',
    seriesId: 'series',
    scheduledStart: new Date('2023-01-01T10:00:00Z'),
    raceOfDay: 1,
    type: 'Conventional',
    status: 'Completed',
    isDiscardable: true,
    isAverageLap: false,
  };

  it('should score a level rating race with 3 competitors', () => {
    const competitors = [
      createCompetitor('2', 720, 'OK'), // 2nd, 12 mins
      createCompetitor('1', 600, 'OK'), // 1st, 10 mins
      createCompetitor('3', 840, 'OK'), // 3rd, 14 mins
    ];

    const results = scoreRace(competitors, 'Level Rating', mockRace, 'shortSeries2017', 3);

    const r1 = results.find(r => r.sailNumber === 101)!;
    const r2 = results.find(r => r.sailNumber === 102)!;
    const r3 = results.find(r => r.sailNumber === 103)!;

    expect(r1.points).toBe(1);
    expect(r1.correctedTime).toBe(600);
    expect(r2.points).toBe(2);
    expect(r2.correctedTime).toBe(720);
    expect(r3.points).toBe(3);
    expect(r3.correctedTime).toBe(840);
  });

  it('should score a pursuit race based on manual position', () => {
    const pursuitRace: Race = { ...mockRace, type: 'Pursuit' };
    const competitors = [
      createCompetitor('1', null, 'OK', { manualPosition: 2 }),
      createCompetitor('2', null, 'OK', { manualPosition: 1 }),
      createCompetitor('3', null, 'OK', { manualPosition: 3 }),
    ];

    const results = scoreRace(competitors, 'Level Rating', pursuitRace, 'shortSeries2017', 3);

    const r1 = results.find(r => r.sailNumber === 101)!;
    const r2 = results.find(r => r.sailNumber === 102)!;
    const r3 = results.find(r => r.sailNumber === 103)!;

    expect(r2.points).toBe(1); // from manualPosition: 1
    expect(r1.points).toBe(2); // from manualPosition: 2
    expect(r3.points).toBe(3); // from manualPosition: 3
  });

  it('should handle a 3-way tie in a handicap race with 5 competitors', () => {
    const competitors = [
      createCompetitor('1', 600, 'OK'), // 1st
      createCompetitor('2', 720, 'OK', { handicap: 1200 }), // Corrected: 600. Ties for 1st
      createCompetitor('3', 540, 'OK', { handicap: 900 }),  // Corrected: 600. Ties for 1st
      createCompetitor('4', 800, 'OK'), // 4th
      createCompetitor('5', 900, 'OK'), // 5th
    ];

    // Positions 1, 2, 3 are tied. Points = (1+2+3)/3 = 2
    // Position 4 gets 4 points.
    // Position 5 gets 5 points.
    const results = scoreRace(competitors, 'PY', mockRace, 'shortSeries2017', 5);

    const r1 = results.find(r => r.sailNumber === 101)!;
    const r2 = results.find(r => r.sailNumber === 102)!;
    const r3 = results.find(r => r.sailNumber === 103)!;
    const r4 = results.find(r => r.sailNumber === 104)!;
    const r5 = results.find(r => r.sailNumber === 105)!;

    expect(r1.points).toBe(2);
    expect(r2.points).toBe(2);
    expect(r3.points).toBe(2);
    expect(r4.points).toBe(4);
    expect(r5.points).toBe(5);
  });

  it('should correctly assign points for various result codes', () => {
    const seriesCompetitorCount = 6;
    const competitors = [
      createCompetitor('1', 600, 'OK'),   // Finisher, 1st
      createCompetitor('2', 700, 'OK'),   // Finisher, 2nd
      createCompetitor('3', null, 'DNF'), // Did Not Finish
      createCompetitor('4', null, 'OCS'), // On Course Side
      createCompetitor('5', null, 'DNS'), // Did Not Start
      createCompetitor('6', null, 'DSQ'), // Disqualified
    ];

    // Starters = 4 (1, 2, 3, 4, 6) - DNS is not a starter
    const starters = 5;
    const starterPoints = starters + 1; // 6 points for DNF, OCS, DSQ
    const nonStarterPoints = seriesCompetitorCount + 1; // 7 points for DNS

    const results = scoreRace(competitors, 'PY', mockRace, 'shortSeries2017', seriesCompetitorCount);

    const r1 = results.find(r => r.sailNumber === 101)!;
    const r2 = results.find(r => r.sailNumber === 102)!;
    const r3 = results.find(r => r.sailNumber === 103)!;
    const r4 = results.find(r => r.sailNumber === 104)!;
    const r5 = results.find(r => r.sailNumber === 105)!;
    const r6 = results.find(r => r.sailNumber === 106)!;

    expect(r1.points).toBe(1);
    expect(r2.points).toBe(2);
    expect(r3.points).toBe(starterPoints); // DNF
    expect(r4.points).toBe(starterPoints); // OCS
    expect(r5.points).toBe(nonStarterPoints); // DNS
    expect(r6.points).toBe(starterPoints); // DSQ
  });

  it("should handle 'NOT FINISHED' result code", () => {
    const seriesCompetitorCount = 3;
    const competitors = [
      createCompetitor('1', 600, 'OK'),
      createCompetitor('2', null, 'NOT FINISHED'),
      createCompetitor('3', null, 'DNS'),
    ];

    // 'NOT FINISHED' is not a starter.
    // Starters = 1 (only competitor '1')
    const starterPoints = 1 + 1; // 2
    const nonStarterPoints = seriesCompetitorCount + 1; // 4

    const results = scoreRace(competitors, 'PY', mockRace, 'shortSeries2017', seriesCompetitorCount);

    const r1 = results.find(r => r.sailNumber === 101)!;
    const r2 = results.find(r => r.sailNumber === 102)!;
    const r3 = results.find(r => r.sailNumber === 103)!;

    expect(r1.points).toBe(1);
    expect(r2.points).toBe(nonStarterPoints); // NOT FINISHED gets non-starter points
    expect(r3.points).toBe(nonStarterPoints); // DNS gets non-starter points
  });

  it('should apply SCP (Scoring Penalty)', () => {
    const competitors = [
      createCompetitor('1', 600, 'OK'), // 1st
      createCompetitor('2', 700, 'SCP'), // 2nd, but gets penalty
      createCompetitor('3', 800, 'OK'), // 3rd
    ];

    // c2 finishes 2nd, gets 2 points.
    // SCP penalty is 20%, so 2 * 1.2 = 2.4 points.
    // Final order by points: c1 (1), c2 (2.4), c3 (3)
    const results = scoreRace(competitors, 'PY', mockRace, 'shortSeries2017', 3);

    const r1 = results.find(r => r.sailNumber === 101)!;
    const r2 = results.find(r => r.sailNumber === 102)!;
    const r3 = results.find(r => r.sailNumber === 103)!;

    expect(r1.points).toBe(1);
    expect(r2.points).toBe(2.4);
    expect(r3.points).toBe(3);
  });
});
