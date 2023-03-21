import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfSupportStateComponent } from './grf-support-state.component';

describe('GrfSupportStateComponent', () => {
  let component: GrfSupportStateComponent;
  let fixture: ComponentFixture<GrfSupportStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfSupportStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfSupportStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
