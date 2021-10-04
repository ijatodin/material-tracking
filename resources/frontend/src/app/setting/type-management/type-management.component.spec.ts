import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeManagementComponent } from './type-management.component';

describe('TypeManagementComponent', () => {
  let component: TypeManagementComponent;
  let fixture: ComponentFixture<TypeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
