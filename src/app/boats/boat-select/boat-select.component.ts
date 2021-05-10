import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, interval, Observable, of } from 'rxjs';
import { debounce, map, startWith } from 'rxjs/operators';
import { Boat, BoatsQuery, BoatsService } from '..';

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
  selector: 'app-boat-select',
  templateUrl: './boat-select.component.html',
  styleUrls: ['./boat-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoatSelectComponent implements OnInit {

  boats$: Observable<Boat[]> = of([]);

  filter = new FormControl('');

  @Output() selected = new EventEmitter<Boat>();

  constructor(private service: BoatsService,
    private query: BoatsQuery) {
      this.service.ensureCollection();
  }

  ngOnInit() {
    const filter$ = this.filter.valueChanges.pipe(
      startWith(this.filter.value)
    );

    this.boats$ = combineLatest([this.query.selectAll(), filter$]).pipe(
      debounce(() => interval(250)),
      map( ([boats, filter]) => filterBoats(boats, filter))
    );
  }

  itemTapped(event: any, boat: Boat) {
    this.selected.emit(boat);
  }

}
