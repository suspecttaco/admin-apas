import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelaSelector } from './escuela-selector';

describe('EscuelaSelector', () => {
  let component: EscuelaSelector;
  let fixture: ComponentFixture<EscuelaSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscuelaSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(EscuelaSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
