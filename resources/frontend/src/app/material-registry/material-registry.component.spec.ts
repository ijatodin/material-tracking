import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialRegistryComponent } from './material-registry.component';

describe('MaterialRegistryComponent', () => {
  let component: MaterialRegistryComponent;
  let fixture: ComponentFixture<MaterialRegistryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialRegistryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialRegistryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
