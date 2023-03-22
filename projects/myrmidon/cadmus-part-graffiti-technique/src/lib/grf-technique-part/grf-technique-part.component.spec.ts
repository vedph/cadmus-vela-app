import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfTechniquePartComponent } from './grf-technique-part.component';

describe('GrfTechniquePartComponent', () => {
  let component: GrfTechniquePartComponent;
  let fixture: ComponentFixture<GrfTechniquePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfTechniquePartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfTechniquePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
