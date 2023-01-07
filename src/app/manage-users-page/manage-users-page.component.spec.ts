import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageUsersPageComponent } from './manage-users-page.component';

describe('ManageUsersPageComponent', () => {
  let component: ManageUsersPageComponent;
  let fixture: ComponentFixture<ManageUsersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageUsersPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageUsersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
