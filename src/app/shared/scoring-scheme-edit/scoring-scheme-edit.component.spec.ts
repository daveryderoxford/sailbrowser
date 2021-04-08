import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringSchemeEditComponent } from './scoring-scheme-edit.component';

describe('ScoringSchemeEditComponent', () => {
  let component: ScoringSchemeEditComponent;
  let fixture: ComponentFixture<ScoringSchemeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoringSchemeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringSchemeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
