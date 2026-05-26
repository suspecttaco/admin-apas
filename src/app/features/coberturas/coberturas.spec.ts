import { TestBed } from '@angular/core/testing';

import { Coberturas } from './coberturas';

describe('Coberturas', () => {
  let service: Coberturas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Coberturas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
