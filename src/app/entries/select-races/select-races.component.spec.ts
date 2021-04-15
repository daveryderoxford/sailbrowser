import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRacesComponent } from './select-races.component';

describe('SelectRacesComponent', () => {
  let component: SelectRacesComponent;
  let fixture: ComponentFixture<SelectRacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
