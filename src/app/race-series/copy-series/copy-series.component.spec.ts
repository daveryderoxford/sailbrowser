import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CopySeriesComponent } from './copy-series.component';

describe('CopySeriesComponent', () => {
  let component: CopySeriesComponent;
  let fixture: ComponentFixture<CopySeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CopySeriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CopySeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
