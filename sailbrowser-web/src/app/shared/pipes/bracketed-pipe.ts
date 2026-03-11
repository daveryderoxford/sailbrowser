import { Pipe, PipeTransform } from "@angular/core";

/** Brackets a string or number, 
 * Handling input of null/undefined, empty and NaN.
*/
@Pipe({
   name: 'bracketed',
   pure: true,
})
export class BracketedPipe implements PipeTransform {
   transform(pos: number | string): string {
      if (!pos) {
         return '';
      }
      if (typeof pos ==='string') {
         return (pos === '') ? '' : `(${pos})`;
      } else {
      return isNaN(pos) ? '' : `(${pos.toString()})`;
      }
   }
}