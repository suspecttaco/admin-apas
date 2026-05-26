import { TestBed } from '@angular/core/testing';

import { Nombramientos } from './nombramientos';

describe('Nombramientos', () => {
  let service: Nombramientos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Nombramientos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
