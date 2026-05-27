import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlazaForm } from './plaza-form';

describe('PlazaForm', () => {
  let component: PlazaForm;
  let fixture: ComponentFixture<PlazaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlazaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(PlazaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
