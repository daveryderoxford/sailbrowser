import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceDayRacesComponent } from './race-day-races.component';

describe('RaceDayRacesComponent', () => {
  let component: RaceDayRacesComponent;
  let fixture: ComponentFixture<RaceDayRacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceDayRacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceDayRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
