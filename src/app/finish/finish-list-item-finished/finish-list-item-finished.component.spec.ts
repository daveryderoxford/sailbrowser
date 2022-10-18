import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishListItemFinishedComponent } from './finish-list-item-finished.component';

describe('FinishListItemFinishedComponent', () => {
  let component: FinishListItemFinishedComponent;
  let fixture: ComponentFixture<FinishListItemFinishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishListItemFinishedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishListItemFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
