import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfSupportPartComponent } from './grf-support-part.component';

describe('GrfSupportPartComponent', () => {
  let component: GrfSupportPartComponent;
  let fixture: ComponentFixture<GrfSupportPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfSupportPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfSupportPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
