import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Boat, BoatsQuery, BoatsService } from 'app/boats/index';
import { combineLatest, interval, Observable, of } from 'rxjs';
import { debounce, map, startWith } from 'rxjs/operators';

function filterBoats(boats: Boat[], filter: string): Boat[] {

  if (filter === '') {
    return boats;
  }

  const f: string = filter.toLowerCase();

  return boats.filter((boat) => {
    const res =
      boat.name.toLowerCase().indexOf(f) > -1 ||
      boat.sailNumber.toString().indexOf(f) > -1 ||
      boat.helm.toLowerCase().indexOf(f) > -1 ||
      boat.crew.toLowerCase().indexOf(f) > -1 ||
      boat.owner.toLowerCase().indexOf(f) > -1 ||
      boat.sailingClass.toLowerCase().indexOf(f) > -1;
      return res;
  });
}

@Component({
  selector: 'app-boats-list',
  templateUrl: './boats-list.component.html',
  styleUrls: ['./boats-list.component.scss']
})
export class BoatsListComponent implements OnInit {
  boats$: Observable<Boat[]> = of([]);

  filter = new FormControl('');

  constructor(private service: BoatsService,
    private query: BoatsQuery,
    private router: Router) {
      this.service.ensureCollection();
  }

  ngOnInit() {

    const filter$ = this.filter.valueChanges.pipe(
      startWith(this.filter.value)
    );

    this.boats$ = combineLatest([this.query.selectAll(), filter$]).pipe(
      debounce(() => interval(250)),
      map(([boats, filter]) => filterBoats(boats, filter))
    );
  }

  itemTapped(event: any, boat: Boat) {
    this.service.setActive(boat.id);
    this.router.navigate(['/boats/edit']);
  }

  onNew() {
    this.service.setActive(null);
    this.router.navigate(['/boats/edit']);
  }
}

