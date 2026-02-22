import { computed, inject, Injectable, resource, signal } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from '@angular/fire/firestore';
import { dataObjectConverter } from 'app/shared/firebase/firestore-helper';
import { PublishedRace } from '../model/published-race';
import { PublishedSeason } from '../model/published-season';
import { PublishedSeries, PublishedSeriesResult } from '../model/published-series';

interface SeriesRaces {
  series: PublishedSeries | undefined;
  races: PublishedRace[];
}

@Injectable({
  providedIn: 'root'
})
export class PublishedResultsReader {
  private readonly firestore = getFirestore(inject(FirebaseApp));

  private seasonsCollection = collection(
    this.firestore, '/published-seasons').withConverter(dataObjectConverter<PublishedSeason>());

  private seriesCollection = collection(
    this.firestore, '/published-series').withConverter(dataObjectConverter<PublishedSeries>());

  private racesCollection = collection(
    this.firestore, '/published-races').withConverter(dataObjectConverter<PublishedRace>());

  /** One-time load with no monitoring */
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