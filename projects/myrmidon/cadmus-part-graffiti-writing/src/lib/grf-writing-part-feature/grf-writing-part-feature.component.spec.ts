import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfWritingPartFeatureComponent } from './grf-writing-part-feature.component';

describe('GrfWritingPartFeatureComponent', () => {
  let component: GrfWritingPartFeatureComponent;
  let fixture: ComponentFixture<GrfWritingPartFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfWritingPartFeatureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfWritingPartFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
