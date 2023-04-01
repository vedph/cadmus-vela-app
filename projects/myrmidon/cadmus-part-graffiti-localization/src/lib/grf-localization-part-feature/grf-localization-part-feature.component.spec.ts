import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfLocalizationPartFeatureComponent } from './grf-localization-part-feature.component';

describe('GrfLocalizationPartFeatureComponent', () => {
  let component: GrfLocalizationPartFeatureComponent;
  let fixture: ComponentFixture<GrfLocalizationPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfLocalizationPartFeatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfLocalizationPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
