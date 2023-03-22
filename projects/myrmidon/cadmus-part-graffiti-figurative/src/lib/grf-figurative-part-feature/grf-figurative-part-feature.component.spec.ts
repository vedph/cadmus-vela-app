import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfFigurativePartFeatureComponent } from './grf-figurative-part-feature.component';

describe('GrfFigurativePartFeatureComponent', () => {
  let component: GrfFigurativePartFeatureComponent;
  let fixture: ComponentFixture<GrfFigurativePartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfFigurativePartFeatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfFigurativePartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
