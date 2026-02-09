import { BoatClass } from './boat-class';
import { Fleet } from './fleet';

export interface Club {
   name: string;
   fleets: Fleet[];
   classes: BoatClass[];
}