import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelaForm } from './escuela-form';

describe('EscuelaForm', () => {
  let component: EscuelaForm;
  let fixture: ComponentFixture<EscuelaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscuelaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(EscuelaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
