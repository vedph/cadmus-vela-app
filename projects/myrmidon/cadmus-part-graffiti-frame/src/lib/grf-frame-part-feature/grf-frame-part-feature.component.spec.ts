import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfFramePartFeatureComponent } from './grf-frame-part-feature.component';

describe('GrfFramePartFeatureComponent', () => {
  let component: GrfFramePartFeatureComponent;
  let fixture: ComponentFixture<GrfFramePartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfFramePartFeatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfFramePartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
