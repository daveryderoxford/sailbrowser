import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishListItemComponent } from './finish-list-item.component';

xdescribe('FinishListItemComponent', () => {
  let component: FinishListItemComponent;
  let fixture: ComponentFixture<FinishListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
