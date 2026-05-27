import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoberturaForm } from './cobertura-form';

describe('CoberturaForm', () => {
  let component: CoberturaForm;
  let fixture: ComponentFixture<CoberturaForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoberturaForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CoberturaForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
