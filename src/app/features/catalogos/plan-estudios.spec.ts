import { TestBed } from '@angular/core/testing';

import { PlanEstudios } from './plan-estudios';

describe('PlanEstudios', () => {
  let service: PlanEstudios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanEstudios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
