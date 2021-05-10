import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Boat, BoatsQuery, BoatsService } from 'app/boats/index';
import { combineLatest, interval, Observable, of } from 'rxjs';
import { debounce, map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-boats-list',
  templateUrl: './boats-list.component.html',
  styleUrls: ['./boats-list.component.scss']
})
export class BoatsListComponent {

  constructor(private service: BoatsService,
    private query: BoatsQuery,
    private router: Router) {
      this.service.ensureCollection();
  }

   itemTapped(boat: Boat) {
    this.service.setActive(boat.id);
    this.router.navigate(['/boats/edit']);
  }

  onNew() {
    this.service.setActive(null);
    this.router.navigate(['/boats/edit']);
  }
}

