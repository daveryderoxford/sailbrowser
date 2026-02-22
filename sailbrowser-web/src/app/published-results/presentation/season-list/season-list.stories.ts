
import { importProvidersFrom } from '@angular/core';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

import { RouterTestingModule } from '@angular/router/testing';
import { PublishedSeason } from 'app/published-results';
import { SeasonList } from './season-list';

const mockSeasons: PublishedSeason[] = [
  {
    id: '2024',
    series: [
      { id: 's1', name: 'Spring Series', fleetId: 'laser', startDate: new Date('2024-04-01'), endDate: new Date('2024-05-31'), raceCount: 1, seriesId: 'eee' },
      { id: 's2', name: 'Summer Series', fleetId: 'laser', startDate: new Date('2024-06-01'), endDate: new Date('2024-08-31'), raceCount: 1, seriesId: 'eee' },
      { id: 's3', name: 'Autumn Series', fleetId: 'rs200', startDate: new Date('2024-09-01'), endDate: new Date('2024-10-31'), raceCount: 1, seriesId: 'eee' },
    ],
  },
  {
    id: '2025',
    series: [
      { id: 's4', name: 'Frostbite', fleetId: 'solo', startDate: new Date('2025-01-01'), endDate: new Date('2025-03-31'), raceCount: 1, seriesId: 'eee' },
      { id: 's5', name: 'Spring Warmup', fleetId: 'laser', startDate: new Date('2025-04-01'), endDate: new Date('2025-04-30'), raceCount: 1, seriesId: 'eee' },
    ],
  },
  {
    id: '2026',
    series: [
      // This series is "in progress" based on the current date of Feb 22, 2026
      { id: 's6', name: 'Winter Wonder', fleetId: 'wanderer', startDate: new Date(new Date('2026-01-15')), endDate: new Date('2026-03-15'), raceCount: 1, seriesId: 'eee' },
    ],
  }
];


const meta: Meta<SeasonList> = {
  title: 'Published Results/Season List',
  component: SeasonList,
  decorators: [
    applicationConfig({
      providers: [importProvidersFrom(RouterTestingModule)],
    }),
  ],
  argTypes: {
  },
  args: {
    seasons: mockSeasons,
  },
};

export default meta;
type Story = StoryObj<SeasonList>;

export const Default: Story = {};

export const Filtered: Story = {
  args: {
    seasons: mockSeasons,
    // This isn't a real input, but demonstrates how the component would look if a user typed 'laser'
  },
  play: async ({ canvasElement, component }) => {
    component.fleetFilter.set('laser');
  },
};

export const Empty: Story = {
  args: {
    seasons: [],
  },
};