import { Pipe, PipeTransform } from '@angular/core';
import { BoatType, boatTypes } from '.';

@Pipe({
  name: 'boatType'
})
export class BoatTypePipe implements PipeTransform {

  transform(value: BoatType): string | undefined {
    const bt = boatTypes.find( (item) => item.type === value );
    return bt?.label;
  }
}
