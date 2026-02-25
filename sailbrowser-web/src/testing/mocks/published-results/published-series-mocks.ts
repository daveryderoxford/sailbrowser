import { PublishedSeries } from 'app/published-results/model/published-series';

export const PUBLIC_SERIES_MOCK : PublishedSeries = {
   id: 'test-series',
   competitors: [
      {
         rank: 1,
         helm: 'John Doe',
         boatClass: 'Laser',
         sailNumber: 12345,
         club: 'SBSC',
         handicap: 1000,
         totalPoints: 5,
         netPoints: 3,
         raceScores: [
            { points: 1, resultCode: 'OK', isDiscard: false },
            { points: 2, resultCode: 'OK', isDiscard: false },
            { points: 2, resultCode: 'DSQ', isDiscard: false },
            { points: 2, resultCode: 'OK', isDiscard: true },
            { points: 2, resultCode: 'OCS', isDiscard: true },
            { points: 2, resultCode: 'OK', isDiscard: true },
         ],
         tiebreakScores: [],
      },
      {
         rank: 2,
         helm: 'Jane Smith',
         crew: 'Jim Crew',
         boatClass: 'RS200',
         sailNumber: 987,
         club: 'SBSC',
         handicap: 950,
         totalPoints: 7,
         netPoints: 4,
         raceScores: [
            { points: 3, resultCode: 'OK', isDiscard: true },
            { points: 1, resultCode: 'OK', isDiscard: false },
            { points: 3, resultCode: 'OK', isDiscard: false },
            { points: 3, resultCode: 'OK', isDiscard: false },
            { points: 3, resultCode: 'OK', isDiscard: false },
            { points: 3, resultCode: 'OK', isDiscard: false },
         ],
         tiebreakScores: [],
      },
   ],
};

// A factory for more flexibility
export const createPublishedSeries = (overrides?: Partial<PublishedSeries>): PublishedSeries => ({
   ...PUBLIC_SERIES_MOCK,
   ...overrides
});