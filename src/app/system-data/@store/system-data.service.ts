import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { tap } from 'rxjs/operators';
import { SystemData } from './system-data.model';
import { SystemDataStore } from './system-data.store';

const defaultData: SystemData = {
  boatClasses: [
    { name: '420', handicaps: [{ scheme: 'RYA_PY', value: 1105 }], type: 'DoubleHander' },
    { name: '2000', handicaps: [{ scheme: 'RYA_PY', value: 1114 }], type: 'DoubleHander' },
    { name: '29er', handicaps: [{ scheme: 'RYA_PY', value: 903 }], type: 'DoubleHander' },
    { name: '505', handicaps: [{ scheme: 'RYA_PY', value: 903 }], type: 'DoubleHander' },
    { name: 'Albacore', handicaps: [{ scheme: 'RYA_PY', value: 1040 }], type: 'DoubleHander' },
    { name: 'Blaze', handicaps: [{ scheme: 'RYA_PY', value: 1033 }], type: 'SingleHander' },
    { name: 'British Moth', handicaps: [{ scheme: 'RYA_PY', value: 1160 }], type: 'SingleHander' },
    { name: 'Byte Cii', handicaps: [{ scheme: 'RYA_PY', value: 1135 }], type: 'SingleHander' },
    { name: 'Comet', handicaps: [{ scheme: 'RYA_PY', value: 1210 }], type: 'DoubleHander' },
    { name: 'Comet Trio (Mk I)', handicaps: [{ scheme: 'RYA_PY', value: 1104 }], type: 'DoubleHander' },
    { name: 'Comet Trio (Mk II)', handicaps: [{ scheme: 'RYA_PY', value: 1052 }], type: 'DoubleHander' },
    { name: 'Contender', handicaps: [{ scheme: 'RYA_PY', value: 969 }], type: 'SingleHander' },
    { name: 'Devoti D-One', handicaps: [{ scheme: 'RYA_PY', value: 948 }], type: 'SingleHander' },
    { name: 'Devoti D-Zero', handicaps: [{ scheme: 'RYA_PY', value: 1029 }], type: 'SingleHander' },
    { name: 'Enterprise', handicaps: [{ scheme: 'RYA_PY', value: 1122 }], type: 'DoubleHander' },
    { name: 'Europe', handicaps: [{ scheme: 'RYA_PY', value: 1141 }], type: 'SingleHander' },
    { name: 'Finn', handicaps: [{ scheme: 'RYA_PY', value: 1049 }], type: 'SingleHander' },
    { name: 'Fireball', handicaps: [{ scheme: 'RYA_PY', value: 952 }], type: 'DoubleHander' },
    { name: 'Firefly', handicaps: [{ scheme: 'RYA_PY', value: 1172 }], type: 'DoubleHander' },
    { name: 'GP14', handicaps: [{ scheme: 'RYA_PY', value: 1130 }], type: 'DoubleHander' },
    { name: 'Graduate', handicaps: [{ scheme: 'RYA_PY', value: 1132 }], type: 'DoubleHander' },
    { name: 'Hadron H2', handicaps: [{ scheme: 'RYA_PY', value: 1034 }], type: 'SingleHander' },
    { name: 'Kestrel', handicaps: [{ scheme: 'RYA_PY', value: 1038 }], type: 'DoubleHander' },
    { name: 'Lark', handicaps: [{ scheme: 'RYA_PY', value: 1073 }], type: 'DoubleHander' },
    { name: 'Laser', handicaps: [{ scheme: 'RYA_PY', value: 1100 }], type: 'SingleHander' },
    { name: 'ILCA 7', handicaps: [{ scheme: 'RYA_PY', value: 1100 }], type: 'SingleHander' },
    { name: 'Laser 4.7', handicaps: [{ scheme: 'RYA_PY', value: 1208 }], type: 'SingleHander' },
    { name: 'ILCA 4', handicaps: [{ scheme: 'RYA_PY', value: 1208 }], type: 'SingleHander' },
    { name: 'Laser Radial/ILCA 6', handicaps: [{ scheme: 'RYA_PY', value: 1147 }], type: 'SingleHander' },
    { name: 'ILCA 6', handicaps: [{ scheme: 'RYA_PY', value: 1147 }], type: 'SingleHander' },
    { name: 'Lightning 368', handicaps: [{ scheme: 'RYA_PY', value: 1162 }], type: 'SingleHander' },
    { name: 'Megabyte', handicaps: [{ scheme: 'RYA_PY', value: 1076 }], type: 'SingleHander' },
    { name: 'Merlin-Rocket', handicaps: [{ scheme: 'RYA_PY', value: 980 }], type: 'DoubleHander' },
    { name: 'Miracle', handicaps: [{ scheme: 'RYA_PY', value: 1194 }], type: 'DoubleHander' },
    { name: 'Mirror (D/H)', handicaps: [{ scheme: 'RYA_PY', value: 1390 }], type: 'DoubleHander' },
    { name: 'Mirror (S/H)', handicaps: [{ scheme: 'RYA_PY', value: 1380 }], type: 'SingleHander' },
    { name: 'Musto Skiff', handicaps: [{ scheme: 'RYA_PY', value: 849 }], type: 'SingleHander' },
    { name: 'National 12', handicaps: [{ scheme: 'RYA_PY', value: 1064 }], type: 'DoubleHander' },
    { name: 'OK', handicaps: [{ scheme: 'RYA_PY', value: 1104 }], type: 'SingleHander' },
    { name: 'Optimist', handicaps: [{ scheme: 'RYA_PY', value: 1642 }], type: 'SingleHander' },
    { name: 'Osprey', handicaps: [{ scheme: 'RYA_PY', value: 930 }], type: 'DoubleHander' },
    { name: 'Phantom', handicaps: [{ scheme: 'RYA_PY', value: 1004 }], type: 'SingleHander' },
    { name: 'Rooster 8.1', handicaps: [{ scheme: 'RYA_PY', value: 1045 }], type: 'SingleHander' },
    { name: 'RS 100 8.4', handicaps: [{ scheme: 'RYA_PY', value: 1004 }], type: 'SingleHander' },
    { name: 'RS 100 10.2', handicaps: [{ scheme: 'RYA_PY', value: 981 }], type: 'SingleHander' },
    { name: 'RS 200', handicaps: [{ scheme: 'RYA_PY', value: 1046 }], type: 'DoubleHander' },
    { name: 'RS 300', handicaps: [{ scheme: 'RYA_PY', value: 970 }], type: 'SingleHander' },
    { name: 'RS 400', handicaps: [{ scheme: 'RYA_PY', value: 942 }], type: 'DoubleHander' },
    { name: 'RS 500', handicaps: [{ scheme: 'RYA_PY', value: 966 }], type: 'DoubleHander' },
    { name: 'RS 600', handicaps: [{ scheme: 'RYA_PY', value: 920 }], type: 'SingleHander' },
    { name: 'RS 700', handicaps: [{ scheme: 'RYA_PY', value: 845 }], type: 'SingleHander' },
    { name: 'RS 800', handicaps: [{ scheme: 'RYA_PY', value: 799 }], type: 'DoubleHander' },
    { name: 'RS Aero 5', handicaps: [{ scheme: 'RYA_PY', value: 1136 }], type: 'SingleHander' },
    { name: 'RS Aero 7', handicaps: [{ scheme: 'RYA_PY', value: 1065 }], type: 'SingleHander' },
    { name: 'RS Aero 9', handicaps: [{ scheme: 'RYA_PY', value: 1014 }], type: 'SingleHander' },
    { name: 'RS Feva XL', handicaps: [{ scheme: 'RYA_PY', value: 1244 }], type: 'DoubleHander' },
    { name: 'RS Tera Pro', handicaps: [{ scheme: 'RYA_PY', value: 1359 }], type: 'SingleHander' },
    { name: 'RS Tera Sport', handicaps: [{ scheme: 'RYA_PY', value: 1445 }], type: 'SingleHander' },
    { name: 'RS Vareo', handicaps: [{ scheme: 'RYA_PY', value: 1093 }], type: 'SingleHander' },
    { name: 'RS Vision', handicaps: [{ scheme: 'RYA_PY', value: 1137 }], type: 'DoubleHander' },
    { name: 'Scorpion', handicaps: [{ scheme: 'RYA_PY', value: 1041 }], type: 'DoubleHander' },
    { name: 'Seafly', handicaps: [{ scheme: 'RYA_PY', value: 1071 }], type: 'DoubleHander' },
    { name: 'Snipe', handicaps: [{ scheme: 'RYA_PY', value: 1108 }], type: 'DoubleHander' },
    { name: 'Solo', handicaps: [{ scheme: 'RYA_PY', value: 1142 }], type: 'SingleHander' },
    { name: 'Solution', handicaps: [{ scheme: 'RYA_PY', value: 1092 }], type: 'SingleHander' },
    { name: 'Streaker', handicaps: [{ scheme: 'RYA_PY', value: 1128 }], type: 'SingleHander' },
    { name: 'Supernova', handicaps: [{ scheme: 'RYA_PY', value: 1077 }], type: 'SingleHander' },
    { name: 'Tasar', handicaps: [{ scheme: 'RYA_PY', value: 1022 }], type: 'DoubleHander' },
    { name: 'Topper', handicaps: [{ scheme: 'RYA_PY', value: 1365 }], type: 'SingleHander' },
    { name: 'Wanderer', handicaps: [{ scheme: 'RYA_PY', value: 1193 }], type: 'DoubleHander' },
    { name: 'Wayfarer', handicaps: [{ scheme: 'RYA_PY', value: 1102 }], type: 'DoubleHander' },
    { name: 'B14', handicaps: [{ scheme: 'RYA_PY', value: 860 }], type: 'DoubleHander' },
    { name: 'Byte Ci', handicaps: [{ scheme: 'RYA_PY', value: 1215 }], type: 'SingleHander' },
    { name: 'Cadet', handicaps: [{ scheme: 'RYA_PY', value: 1430 }], type: 'DoubleHander' },
    { name: 'Canoe International', handicaps: [{ scheme: 'RYA_PY', value: 884 }], type: 'SingleHander' },
    { name: 'Hornet', handicaps: [{ scheme: 'RYA_PY', value: 955 }], type: 'DoubleHander' },
    { name: 'Laser Stratos', handicaps: [{ scheme: 'RYA_PY', value: 1103 }], type: 'DoubleHander' },
    { name: 'Topper 4.2', handicaps: [{ scheme: 'RYA_PY', value: 1409 }], type: 'SingleHander' },
    { name: 'Flying Fifteen', handicaps: [{ scheme: 'RYA_PY', value: 1021 }], type: 'DoubleHander' },
    { name: 'K1', handicaps: [{ scheme: 'RYA_PY', value: 1064 }], type: 'SingleHander' },
    { name: 'K6', handicaps: [{ scheme: 'RYA_PY', value: 919 }], type: 'DoubleHander' },
    { name: 'A Class', handicaps: [{ scheme: 'RYA_PY', value: 684 }], type: 'Cat' },
    { name: 'Catapult', handicaps: [{ scheme: 'RYA_PY', value: 898 }], type: 'Cat' },
    { name: 'Challenger', handicaps: [{ scheme: 'RYA_PY', value: 1173 }], type: 'Cat' },
    { name: 'Dart 18', handicaps: [{ scheme: 'RYA_PY', value: 832 }], type: 'Cat' },
    { name: 'Formula 18', handicaps: [{ scheme: 'RYA_PY', value: 670 }], type: 'Cat' },
    { name: 'Hurricane 5.9 Sx', handicaps: [{ scheme: 'RYA_PY', value: 695 }], type: 'Cat' },
    { name: 'Spitfire', handicaps: [{ scheme: 'RYA_PY', value: 719 }], type: 'Cat' },
    { name: 'Sprint 15', handicaps: [{ scheme: 'RYA_PY', value: 926 }], type: 'Cat' },
    { name: 'Sprint 15 Sport', handicaps: [{ scheme: 'RYA_PY', value: 904 }], type: 'Cat' },
  ]
};

@Injectable({ providedIn: 'root' })
export class SystemDataService {

  constructor(private af: AngularFirestore,
    private store: SystemDataStore) {

      this.store.update(defaultData);


    // Read system data on startup
 /*   const ref = this.af.doc<SystemData>('system_data');

    ref.set(defaultData).then(() => {

      ref.snapshotChanges().pipe(
        tap(snap => {
          const data = snap.payload.data() as SystemData;
          this.store.update(data);
        })
      );
    }); */
  }
}
