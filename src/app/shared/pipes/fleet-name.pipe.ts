import { Pipe, PipeTransform } from '@angular/core';
import { Club } from 'app/clubs/@store/club.model';
import { Fleet } from 'app/model/fleet';

@Pipe({
  name: 'fleetName',
  pure: true
})
export class FleetNamePipe implements PipeTransform {

  transform(id: string | undefined, fleets: Fleet[]): string | undefined {
    const fleet = fleets.find( f => id === f.id);
    return fleet ? fleet.name: '';  }
}

@Pipe({
  name: 'fleetShortName',
  pure: true
})
export class FleetShortNamePipe implements PipeTransform {

  transform(id: string | undefined, fleets: Fleet[]): string {
    const fleet = fleets.find( f => id === f.id );
    return fleet ? fleet.shortName: '';
  }
}


