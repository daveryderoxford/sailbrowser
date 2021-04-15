import { Pipe, PipeTransform } from '@angular/core';
import { Club } from 'app/clubs/@store/club.model';
import { Fleet } from 'app/model/fleet';

@Pipe({
  name: 'fleetName',
  pure: true
})
export class FleetNamePipe implements PipeTransform {

  transform(id: string, fleets: Fleet[]): string | undefined {
    return fleets.find( fleet => id === fleet.id )?.name;
  }
}

@Pipe({
  name: 'fleetShortName',
  pure: true
})
export class FleetShortNamePipe implements PipeTransform {

  transform(id: string, fleets: Fleet[]): string | undefined {
    return fleets.find( fleet => id === fleet.id )?.shortName;
  }
}
