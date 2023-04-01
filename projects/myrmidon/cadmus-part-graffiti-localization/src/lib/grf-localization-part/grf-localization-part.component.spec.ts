import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrfLocalizationPartComponent } from './grf-localization-part.component';

describe('GrfLocalizationPartComponent', () => {
  let component: GrfLocalizationPartComponent;
  let fixture: ComponentFixture<GrfLocalizationPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrfLocalizationPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrfLocalizationPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
