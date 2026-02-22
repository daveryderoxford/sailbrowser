import { importProvidersFrom, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { PUBLISHED_RACES_MOCKS } from '@testing/mocks/published-results/published-races-mocks';
import { MOCK_PUBLISHED_SEASONS } from '@testing/mocks/published-results/published-season-mocks';
import { PUBLIC_SERIES_MOCK } from '@testing/mocks/published-results/published-series-mocks';
import { PublishedResultsReader } from '../../services/published-results-store';
import { ResultsViewer } from './results-viewer';

const createMockReader = (isLoading = false) => ({
  seasons: signal(MOCK_PUBLISHED_SEASONS).asReadonly(),
  isLoadingSeasons: signal(false).asReadonly(),
  selectedSeriesId: signal('s1'),
  series: signal(PUBLIC_SERIES_MOCK).asReadonly(),
  races: signal(PUBLISHED_RACES_MOCKS).asReadonly(),
  seriesLoading: signal(isLoading).asReadonly(),
  seriesError: signal(null).asReadonly(),
});

const meta: Meta<ResultsViewer> = {
  title: 'Published Results/Results Viewer',
  component: ResultsViewer,
  decorators: [
    applicationConfig({
      providers: [
        importProvidersFrom(RouterTestingModule, MatIconModule, MatButtonModule),
      ],
    }),
  ],
  argTypes: {
    id: {
      control: false, // Controlled by the mock service
    },
  },
};

export default meta;
type Story = StoryObj<ResultsViewer>;

export const Default: Story = {
  args: {
    id: 's1',
  },
  decorators: [
    applicationConfig({
      providers: [{ provide: PublishedResultsReader, useValue: createMockReader(false) }],
    }),
  ],
};

export const Loading: Story = {
  ...Default,
  decorators: [
    applicationConfig({
      providers: [{ provide: PublishedResultsReader, useValue: createMockReader(true) }],
    }),
  ],
};
