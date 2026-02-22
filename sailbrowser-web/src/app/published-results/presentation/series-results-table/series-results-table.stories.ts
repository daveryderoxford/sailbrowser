import { Meta, StoryObj } from '@storybook/angular';
import { SeriesResultsTable } from './series-results-table';
import { PublishedSeries } from '../../model/published-series';

export default {
  title: 'Published Results/Results Table',
  component: SeriesResultsTable,
  decorators: [
  ],
  argTypes: {
    fontSize: {
      control: { type: 'text' },
    },
    raceClicked: { action: 'raceClicked' },
  },
} as Meta<SeriesResultsTable>;

const mockRaceTitles = [
  { id: '1', index: 1, scheduledStart: new Date('2024-05-01'), raceOfDay: 1 },
  { id: '2', index: 2, scheduledStart: new Date('2024-05-01'), raceOfDay: 2 },
  { id: '3', index: 3, scheduledStart: new Date('2024-05-08'), raceOfDay: 1 },
  { id: '4', index: 4, scheduledStart: new Date('2024-05-15'), raceOfDay: 1 },
  { id: '5', index: 5, scheduledStart: new Date('2024-05-22'), raceOfDay: 1 },
  { id: '6', index: 6, scheduledStart: new Date('2024-05-30'), raceOfDay: 1 },
];

const mockSeries: PublishedSeries = {
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
        { points: 2, resultCode: 'OK', isDiscard: true },
        { points: 2, resultCode: 'OK', isDiscard: true },
        { points: 2, resultCode: 'OK', isDiscard: true },
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

type Story = StoryObj<SeriesResultsTable>;

export const Default: Story = {
  args: {
    series: mockSeries,
    raceTitles: mockRaceTitles,
    fontSize: '10pt',
  },
  render: (args) => ({
    props: args,
  }),
};

export const ThirdPlace: Story = {
  args: {
    ...Default.args,
    series: { ...mockSeries, competitors: [{ ...mockSeries.competitors[0], rank: 3 }, mockSeries.competitors[1]] }
  },
  render: (args) => ({
    props: args,
  }),
};
