import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCompetitorComponent } from './select-competitor.component';

describe('SelectCompetitorComponent', () => {
  let component: SelectCompetitorComponent;
  let fixture: ComponentFixture<SelectCompetitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectCompetitorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCompetitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
