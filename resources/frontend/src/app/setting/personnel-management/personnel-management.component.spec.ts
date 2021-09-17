import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonnelManagementComponent } from './personnel-management.component';

describe('PersonnelManagementComponent', () => {
  let component: PersonnelManagementComponent;
  let fixture: ComponentFixture<PersonnelManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonnelManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonnelManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
