
import {
   collection,
   PartialWithFieldValue,
   QueryDocumentSnapshot,
   SetOptions,
   Timestamp,
   DocumentData,
   FirestoreDataConverter,
   FieldValue,
   Firestore,
   doc,
} from '@angular/fire/firestore';

/** Returns a collextion reference that includes a Firestore converter 
 * that @see  
 * 
*/
export const mappedCollectionRef = <T>(fs: Firestore, path: string) => collection(fs, path).withConverter(mappedConverter<T>());
export const mappedDoc = <T>(fs: Firestore, path: string , id: string) => doc(fs, path, id).withConverter(mappedConverter<T>());

/** Generic Firestore converter that converts to/from Dates/Timestamps and converts application  */
export const mappedConverter = <T>(): FirestoreDataConverter<T> => ({
   toFirestore(data: PartialWithFieldValue<T>, options?: SetOptions): DocumentData {
      const partialObject = options !== undefined;
      return toDbModel(data, partialObject, true);
   },
   fromFirestore: (snap: QueryDocumentSnapshot): T => {
      const data = snap.data();
      return { ...toAppModel<T>(data), id: snap.id };
   },
});

/** Returns a collextion reference that includes a Firestore converter that casts
 * the data to/from 
*/
export const typedCollectionRef = <T>(fs: Firestore, path: string) => collection(fs, path).withConverter(typedConverter<T>());

/** Generic Firestore converter that converts to/from Dates/Timestamps and converts application  */
const typedConverter = <T>(): FirestoreDataConverter<T> => ({
   toFirestore(data: PartialWithFieldValue<T>, options?: SetOptions): DocumentData {
      return data as DocumentData;
   },
   fromFirestore: (snap: QueryDocumentSnapshot): T => {
      return snap.data() as T;
   },
});

const isObject = (value: any) => (value !== null && typeof value === 'object' && !Array.isArray(value));

/**
 * Recursively converts properties of an object from App-space to DB-space.
 * - `undefined` values are converted to `null` for full writes. For partial
 *   writes, they are skipped as Firestore does not support `undefined`.
 * - `Date` objects are converted to `Timestamp` objects.
 * - Nested objects and arrays are recursively converted.
 */
export function toDbModel<T>(data: PartialWithFieldValue<T>, partialUpdate: boolean, stripId = false): DocumentData {
   const result: DocumentData = {};
   
   for (let [key, value] of Object.entries(data as Object)) {
      if (stripId && key === 'id') continue;

      value = value as any;

      if (value === undefined) {
         if (partialUpdate) {
            // For partial writes, `undefined` means "don't touch this field", so we do not include it in the written object.
            continue;
         } else {
            result[key] = null;
         }
      } else if (value instanceof Date) {
         result[key] = Timestamp.fromDate(value);
      } else if (Array.isArray(value)) { // Firestore does not support `undefined` in arrays.
         result[key] = value.map(item => {
            if (item === undefined) return null;
            if (item instanceof Date) return Timestamp.fromDate(item);
            if (isObject(item) && !(item instanceof Timestamp) && !(item instanceof FieldValue)) {
               return toDbModel(item, partialUpdate);
            }
            return item;
         });
      } else if (isObject(value) &&
         !(value instanceof Timestamp) &&
         !(value instanceof FieldValue)) {
         result[key] = toDbModel(value as PartialWithFieldValue<unknown>, partialUpdate);
      } else {
         result[key] = value;
      }
   }
   return result;
}

function toAppModel<T>(data: DocumentData): T {
   return toAppModelRecursive(data) as T;
}

function toAppModelRecursive(value: any): any {
   if (value === null) {
      return undefined;
   }
   if (value instanceof Timestamp) {
      return value.toDate();
   }
   if (Array.isArray(value)) {
      return value.map(item => toAppModelRecursive(item));
   }
   if (isObject(value)) {
      // Use a generic object type to clarify we are building an app model object, not another DocumentData object.
      const result: { [key: string]: any; } = {};
      for (const [key, val] of Object.entries(value)) {
         result[key] = toAppModelRecursive(val);
      }
      return result;
   }
   return value;
}
