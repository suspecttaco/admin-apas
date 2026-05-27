import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolEmpleadoForm } from './rol-empleado-form';

describe('RolEmpleadoForm', () => {
  let component: RolEmpleadoForm;
  let fixture: ComponentFixture<RolEmpleadoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolEmpleadoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(RolEmpleadoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
