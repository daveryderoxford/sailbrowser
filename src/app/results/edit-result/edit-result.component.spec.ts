import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResultComponent } from './edit-result.component';

describe('EditResultComponent', () => {
  let component: EditResultComponent;
  let fixture: ComponentFixture<EditResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
