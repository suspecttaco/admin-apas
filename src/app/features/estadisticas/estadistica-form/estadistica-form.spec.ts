import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticaForm } from './estadistica-form';

describe('EstadisticaForm', () => {
  let component: EstadisticaForm;
  let fixture: ComponentFixture<EstadisticaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EstadisticaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
