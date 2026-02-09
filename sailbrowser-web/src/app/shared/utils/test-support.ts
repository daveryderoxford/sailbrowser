
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable, inject } from '@angular/core';


@Injectable()
export class SBTestSupport {
      private auth = inject(AngularFireAuth);
}
