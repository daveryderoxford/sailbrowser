import { PublishedRace } from 'app/published-results/model/published-race';

export const PUBLISHED_RACES_MOCKS : PublishedRace[] = [
   { id: 'r1', seriesId: 'test-series', seriesName: 'Test Series', fleetId: 'laser', type: 'Conventional', isDiscardable: true, index: 1, scheduledStart: new Date('2024-05-01'), raceOfDay: 1, results: [] },
   { id: 'r2', seriesId: 'test-series', seriesName: 'Test Series', fleetId: 'laser', type: 'Conventional', isDiscardable: true, index: 2, scheduledStart: new Date('2024-05-01'), raceOfDay: 2, results: [] },
   { id: 'r3', seriesId: 'test-series', seriesName: 'Test Series', fleetId: 'laser', type: 'Conventional', isDiscardable: true, index: 3, scheduledStart: new Date('2024-05-08'), raceOfDay: 1, results: [] },
   { id: 'r4', seriesId: 'test-series', seriesName: 'Test Series', fleetId: 'laser', type: 'Conventional', isDiscardable: true, index: 4, scheduledStart: new Date('2024-05-15'), raceOfDay: 1, results: [] },
   { id: 'r5', seriesId: 'test-series', seriesName: 'Test Series', fleetId: 'laser', type: 'Conventional', isDiscardable: true, index: 5, scheduledStart: new Date('2024-05-22'), raceOfDay: 1, results: [] },
   { id: 'r6', seriesId: 'test-series', seriesName: 'Test Series', fleetId: 'laser', type: 'Conventional', isDiscardable: true, index: 6, scheduledStart: new Date('2024-05-30'), raceOfDay: 1, results: [] },
];

// A factory for more flexibility
export const createPublishedSeason = (overrides?: Partial<PublishedRace>): PublishedRace => ({
   ...PUBLISHED_RACES_MOCKS[0],
   ...overrides
});