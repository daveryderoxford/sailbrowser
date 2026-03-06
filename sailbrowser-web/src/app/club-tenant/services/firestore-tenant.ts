import { inject } from '@angular/core';
import { FirebaseApp } from '@angular/fire/app';
import { collection, CollectionReference, doc, DocumentReference, Firestore, getFirestore } from '@angular/fire/firestore';
import { ClubContextService } from './club-tenant';
import { dataObjectConverter } from '../../shared/firebase/firestore-helper';

export function createClubSubCollectionRef<T>(...path: string[]): CollectionReference<T> {
   const firestore = inject(Firestore);
   const context = inject(ClubContextService);

   const clubId = context.clubId;

   return collection(firestore, 'clubs', clubId, ...path)
      .withConverter(dataObjectConverter<T>());
}

export function clubDocRef<T>(collection: string, id: string): DocumentReference<T> {

   const firestore = getFirestore(inject(FirebaseApp));

   const clubId = inject(ClubContextService).clubId;

   return doc(firestore, 'clubs', clubId, collection, id).withConverter(dataObjectConverter<T>());
}

export function createClubOjectCollectionRef<T>(...path: string[]) {
   const firestore = inject(Firestore);
   const context = inject(ClubContextService);

   const clubId = context.clubId;

   return collection(firestore, 'clubs', clubId, ...path)
      .withConverter(dataObjectConverter<T>());
}


