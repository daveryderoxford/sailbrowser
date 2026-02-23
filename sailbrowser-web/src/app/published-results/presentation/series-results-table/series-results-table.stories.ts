import { Meta, StoryObj } from '@storybook/angular';
import { SeriesResultsTable } from './series-results-table';
import { PUBLIC_SERIES_MOCK } from '@testing/mocks/published-results/published-series-mocks';

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


type Story = StoryObj<SeriesResultsTable>;

export const Default: Story = {
  args: {
    series: PUBLIC_SERIES_MOCK,
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
    series: { ...PUBLIC_SERIES_MOCK, competitors: [{ ...PUBLIC_SERIES_MOCK.competitors[0], rank: 3 }, PUBLIC_SERIES_MOCK.competitors[1]] }
  },
  render: (args) => ({
    props: args,
  }),
};
