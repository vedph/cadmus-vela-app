import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfStatesPartComponent } from './grf-states-part.component';

describe('GrfStatesPartComponent', () => {
  let component: GrfStatesPartComponent;
  let fixture: ComponentFixture<GrfStatesPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfStatesPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfStatesPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
