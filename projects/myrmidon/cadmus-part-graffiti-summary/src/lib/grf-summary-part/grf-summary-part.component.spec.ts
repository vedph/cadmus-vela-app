import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfSummaryPartComponent } from './grf-summary-part.component';

describe('GrfSummaryPartComponent', () => {
  let component: GrfSummaryPartComponent;
  let fixture: ComponentFixture<GrfSummaryPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfSummaryPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfSummaryPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
