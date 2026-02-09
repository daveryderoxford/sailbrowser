import { RaceStatus } from './race-status';
import { RaceType } from './race-type';

export interface Race {
  id: string;
  seriesName: string;
  index: number;
  fleetId: string;
  seriesId: string;
  scheduledStart: Date;
  raceOfDay: number;
  actualStart: Date;
  type: RaceType;
  status: RaceStatus;
  isDiscardable: boolean;
  isAverageLap: boolean;
}