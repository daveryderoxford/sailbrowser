import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatSelectComponent } from './boat-select.component';

xdescribe('BoatSelectComponent', () => {
  let component: BoatSelectComponent;
  let fixture: ComponentFixture<BoatSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
