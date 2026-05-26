import { TestBed } from '@angular/core/testing';

import { Padron } from './padron';

describe('Padron', () => {
  let service: Padron;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Padron);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
