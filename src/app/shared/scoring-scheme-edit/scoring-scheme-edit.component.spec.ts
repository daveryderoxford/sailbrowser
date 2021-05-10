import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ScoringSchemeEditComponent } from './scoring-scheme-edit.component';

xdescribe('ScoringSchemeEditComponent', () => {
  let component: ScoringSchemeEditComponent;
  let fixture: ComponentFixture<ScoringSchemeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
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
