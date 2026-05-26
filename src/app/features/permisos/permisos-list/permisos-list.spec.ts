import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermisosList } from './permisos-list';

describe('PermisosList', () => {
  let component: PermisosList;
  let fixture: ComponentFixture<PermisosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PermisosList],
    }).compileComponents();

    fixture = TestBed.createComponent(PermisosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
