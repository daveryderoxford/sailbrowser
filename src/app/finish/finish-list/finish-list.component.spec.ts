import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishListComponent } from './finish-list.component';

xdescribe('FinishListComponent', () => {
  let component: FinishListComponent;
  let fixture: ComponentFixture<FinishListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinishListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
