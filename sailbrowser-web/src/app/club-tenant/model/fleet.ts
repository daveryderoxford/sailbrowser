import { HandicapSystem } from 'app/scoring/model/handicap-system';

export interface Fleet {
   id: string;
   name: string;
   shortName: string;
   handicapSystems: HandicapSystem[];
}
