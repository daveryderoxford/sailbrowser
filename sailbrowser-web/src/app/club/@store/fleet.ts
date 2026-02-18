import { HandicapScheme } from 'app/results-input/@store/handicap-scheme';

export interface Fleet {
   id: string;
   name: string;
   shortName: string;
   startOrder: number;
   classFlag: string;
   handicapScheme: HandicapScheme;
}
