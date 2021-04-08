/**  */

import { Fleet } from './fleet';
import { Race } from './race';

interface raceDay {
  races: Race[];

}

interface startData {
}


enum StartStatus {

}

interface start {
  prepFlagName: string;
  fleet: Fleet;
  order: number;
  status: StartStatus;
}
