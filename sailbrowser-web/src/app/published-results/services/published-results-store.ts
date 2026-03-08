import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { doc, getDoc, getDocs, query, where } from '@angular/fire/firestore';
import { PublishedRace } from '../model/published-race';
import { PublishedSeason } from '../model/published-season';
import { PublishedSeries } from '../model/published-series';
import { FirestoreTenantService } from 'app/club-tenant';

interface SeriesRaces {
  series: PublishedSeries | undefined;
  races: PublishedRace[];
}

export const PUBLISHED_SEASONS_PATH = '/published-seasons';
export const PUBLISHED_SERIES_PATH = '/published-series';
export const PUBLISHED_RACES_PATH = '/published-races';

@Injectable({
  providedIn: 'root'
})
export class PublishedResultsReader {
  private tenant = inject(FirestoreTenantService);

  private seasonsCollection = this.tenant.collectionRef<PublishedSeason>(PUBLISHED_SEASONS_PATH);
  private seriesCollection = this.tenant.collectionRef<PublishedSeries>(PUBLISHED_SERIES_PATH);
  private racesCollection = this.tenant.collectionRef<PublishedRace>(PUBLISHED_RACES_PATH);

  /** One-time load with no monitoring of all published seasons */
  private readonly seasonsResource = resource({
    loader: () => getDocs(this.seasonsCollection).then(
      snapshot => snapshot.docs.map(d => d.data())
    ),
    defaultValue: [],
  });

  readonly seasons = this.seasonsResource.value.asReadonly();
  readonly isLoadingSeasons = this.seasonsResource.isLoading;

  selectedSeriesId = signal<string | undefined>(undefined);

  private readonly seriesResource = resource<SeriesRaces, string | undefined>({
    params: () => this.selectedSeriesId(),
    loader: async (data) => {
      const seriesId = data.params;
      if (!seriesId) {
        return ({ series: undefined, races: [] });
      } else {
        const seriesDocRef = doc(this.seriesCollection, seriesId);

        const racesQuery = query(this.racesCollection, where('seriesId', '==', seriesId));

        const [seriesSnap, racesSnap] =
          await Promise.all([getDoc(seriesDocRef), getDocs(racesQuery)]);

        const series = seriesSnap.data();
        const races = racesSnap.docs.map(d => d.data()).sort((a, b) => a.index - b.index);

        return { series, races };

      }
    },
    defaultValue: { series: undefined, races: [] }
  });

  readonly series = computed(() => this.seriesResource.value().series);
  readonly races = computed(() => this.seriesResource.value().races);

  readonly seriesLoading = this.seriesResource.isLoading;
  readonly seriesError = this.seriesResource.error;

}