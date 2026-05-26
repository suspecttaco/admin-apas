import { TestBed } from '@angular/core/testing';

import { RolesEmpleado } from './roles-empleado';

describe('RolesEmpleado', () => {
  let service: RolesEmpleado;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesEmpleado);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
