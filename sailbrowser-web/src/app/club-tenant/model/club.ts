import { Season } from 'app/race-calender/model/season';
import { BoatClass } from './boat-class';
import { Fleet } from './fleet';

export interface Club {
   id: string;
   name: string;
   fleets: Fleet[];
   classes: BoatClass[];
   seasons: Season[];
}