import { TestBed } from '@angular/core/testing';

import { Plazas } from './plazas';

describe('Plazas', () => {
  let service: Plazas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Plazas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
