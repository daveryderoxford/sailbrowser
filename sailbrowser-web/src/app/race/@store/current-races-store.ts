import { computed, inject, Injectable, signal, effect } from '@angular/core';
import { RaceCalendarStore } from 'app/race-calender/@store/full-race-calander';

@Injectable({
   providedIn: 'root',
})
export class CurrentRaces {
  private readonly raceStore = inject(RaceCalendarStore);
  readonly selectedRaceIds = signal<string[]>([]);

  readonly selectedRaces = computed(() => {
    const races = this.raceStore.allRaces();
    const selectedIds = this.selectedRaceIds();
    return races.filter(race => selectedIds.includes(race.id));
  });

  constructor() {
    effect(() => {
      // Initialize with today's races
      const todayStr = new Date().toDateString();
      const todaysRaceIds = this.raceStore.allRaces()
        .filter(race => new Date(race.scheduledStart).toDateString() === todayStr)
        .map(race => race.id);
      this.selectedRaceIds.set(todaysRaceIds);
    }, { allowSignalWrites: true });
  }

  addRaceId = (raceId: string) => this.selectedRaceIds.update(races => [...races, raceId]);
  removeRaceId = (raceId: string) => this.selectedRaceIds.update(races => races.filter(id => id !== raceId));
}