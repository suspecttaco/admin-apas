import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NombramientoForm } from './nombramiento-form';

describe('NombramientoForm', () => {
  let component: NombramientoForm;
  let fixture: ComponentFixture<NombramientoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NombramientoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(NombramientoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
