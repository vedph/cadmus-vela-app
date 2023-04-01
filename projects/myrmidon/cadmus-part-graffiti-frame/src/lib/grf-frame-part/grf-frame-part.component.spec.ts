import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfFramePartComponent } from './grf-frame-part.component';

describe('GrfFramePartComponent', () => {
  let component: GrfFramePartComponent;
  let fixture: ComponentFixture<GrfFramePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfFramePartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfFramePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
