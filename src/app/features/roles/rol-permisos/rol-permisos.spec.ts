import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolPermisos } from './rol-permisos';

describe('RolPermisos', () => {
  let component: RolPermisos;
  let fixture: ComponentFixture<RolPermisos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolPermisos],
    }).compileComponents();

    fixture = TestBed.createComponent(RolPermisos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
