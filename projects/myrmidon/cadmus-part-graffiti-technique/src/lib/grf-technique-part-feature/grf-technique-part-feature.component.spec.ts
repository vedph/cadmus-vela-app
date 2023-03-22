import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfTechniquePartFeatureComponent } from './grf-technique-part-feature.component';

describe('GrfTechniquePartFeatureComponent', () => {
  let component: GrfTechniquePartFeatureComponent;
  let fixture: ComponentFixture<GrfTechniquePartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfTechniquePartFeatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfTechniquePartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
