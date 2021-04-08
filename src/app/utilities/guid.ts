/**
 * Returns a random number between the given minimum and maximum values.
 */

 export class Random {
  static getRandomNumber(min: number, max: number): number {
     // http://jsfiddle.net/alanwsmith/GfAhy/
     return Math.floor(Math.random() * (max - min + 1) + min);
 }

 /**
  * Used to generate a globally unique identifier in the standard GUID string format.
  * For example: D99A5596-5478-4BAA-9A42-3BC352DC9D56
  *
  * @returns A GUID in string format.
  */
 static generateGuid(): string {

         // Will hold the GUID string as we build it.
         var guid: string;

         // Used to hold the generated hex digit as they are generated.
         var hexDigit: string;

         // Used to keep track of our location in the generated string.
         var j: number;

     // Start out with an empty string.
     guid = '';

     // Now loop 35 times to generate 35 characters.
     for (j = 0; j < 32; j++) {

         // Characters at these indexes are always hyphens.
         if (j === 8 || j === 12 || j === 16 || j === 20) {
             guid = guid + '-';
         }

         // Get a random number between 0 and 16 and convert it to its hexadecimal value.
         hexDigit = Math.floor(Math.random() * 16).toString(16).toUpperCase();

         // Add the digit onto the string.
         guid = guid + hexDigit;
     }

     return guid;
 }
}
