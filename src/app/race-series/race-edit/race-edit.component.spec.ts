import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceEditComponent } from './race-edit.component';

describe('RaceEditComponent', () => {
  let component: RaceEditComponent;
  let fixture: ComponentFixture<RaceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
