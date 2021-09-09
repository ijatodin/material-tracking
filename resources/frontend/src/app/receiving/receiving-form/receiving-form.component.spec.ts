import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivingFormComponent } from './receiving-form.component';

describe('ReceivingFormComponent', () => {
  let component: ReceivingFormComponent;
  let fixture: ComponentFixture<ReceivingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
