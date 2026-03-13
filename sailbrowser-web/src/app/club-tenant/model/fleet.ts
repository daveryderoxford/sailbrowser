import { HandicapScheme } from '../../scoring/model/handicap-scheme';

export interface Fleet {
   id: string;
   name: string;
   shortName: string;
   handicapSchemes: HandicapScheme[];
}
