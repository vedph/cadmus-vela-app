import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfStateComponent } from './grf-state.component';

describe('GrfStateComponent', () => {
  let component: GrfStateComponent;
  let fixture: ComponentFixture<GrfStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfStateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
