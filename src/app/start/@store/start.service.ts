import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { tap } from 'rxjs/operators';
import { Start } from './start.model';
import { StartStore } from './start.store';

@Injectable({ providedIn: 'root' })
export class StartService {

  constructor(private startStore: StartStore, private http: HttpClient) {
  }


  get() {
    return this.http.get<Start[]>('https://api.com').pipe(tap(entities => {
      this.startStore.set(entities);
    }));
  }

  add(start: Start) {
    this.startStore.add(start);
  }

  update(id, start: Partial<Start>) {
    this.startStore.update(id, start);
  }

  remove(id: ID) {
    this.startStore.remove(id);
  }

}
