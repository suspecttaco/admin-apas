import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioSlotForm } from './horario-slot-form';

describe('HorarioSlotForm', () => {
  let component: HorarioSlotForm;
  let fixture: ComponentFixture<HorarioSlotForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorarioSlotForm],
    }).compileComponents();

    fixture = TestBed.createComponent(HorarioSlotForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
