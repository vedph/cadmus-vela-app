import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfSupportPartFeatureComponent } from './grf-support-part-feature.component';

describe('GrfSupportPartFeatureComponent', () => {
  let component: GrfSupportPartFeatureComponent;
  let fixture: ComponentFixture<GrfSupportPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfSupportPartFeatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfSupportPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
