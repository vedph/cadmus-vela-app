import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfFigurativePartComponent } from './grf-figurative-part.component';

describe('GrfFigurativePartComponent', () => {
  let component: GrfFigurativePartComponent;
  let fixture: ComponentFixture<GrfFigurativePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfFigurativePartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfFigurativePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
