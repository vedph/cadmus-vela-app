import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfStatesPartFeatureComponent } from './grf-states-part-feature.component';

describe('GrfStatesPartFeatureComponent', () => {
  let component: GrfStatesPartFeatureComponent;
  let fixture: ComponentFixture<GrfStatesPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfStatesPartFeatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfStatesPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
