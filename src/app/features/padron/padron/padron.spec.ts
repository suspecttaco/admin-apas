import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Padron } from './padron';

describe('Padron', () => {
  let component: Padron;
  let fixture: ComponentFixture<Padron>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Padron],
    }).compileComponents();

    fixture = TestBed.createComponent(Padron);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
