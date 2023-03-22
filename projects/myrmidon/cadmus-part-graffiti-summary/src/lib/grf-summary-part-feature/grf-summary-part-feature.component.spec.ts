import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfSummaryPartFeatureComponent } from './grf-summary-part-feature.component';

describe('GrfSummaryPartFeatureComponent', () => {
  let component: GrfSummaryPartFeatureComponent;
  let fixture: ComponentFixture<GrfSummaryPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfSummaryPartFeatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfSummaryPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
