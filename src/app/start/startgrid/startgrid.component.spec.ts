import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartgridComponent } from './startgrid.component';

xdescribe('StartgridComponent', () => {
  let component: StartgridComponent;
  let fixture: ComponentFixture<StartgridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartgridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
