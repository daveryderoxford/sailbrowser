import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { isSameDay } from 'date-fns';
import { RaceDayQuery } from './@store/race-day.query';

@Injectable({
  providedIn: 'root'
})
export class RaceDayGuard implements CanActivate {

  constructor(private raceDayQuery: RaceDayQuery,
    private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const raceDay = this.raceDayQuery.getActive();
    if (raceDay && isSameDay(new Date(raceDay.date), new Date())) {
      return true;
    } else {
      return this.router.parseUrl('/race-day');
    }
  }
}
