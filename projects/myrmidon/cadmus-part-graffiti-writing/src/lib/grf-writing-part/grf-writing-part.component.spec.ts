import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfWritingPartComponent } from './grf-writing-part.component';

describe('GrfWritingPartComponent', () => {
  let component: GrfWritingPartComponent;
  let fixture: ComponentFixture<GrfWritingPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfWritingPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfWritingPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
