import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnosList } from './turnos-list';

describe('TurnosList', () => {
  let component: TurnosList;
  let fixture: ComponentFixture<TurnosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TurnosList],
    }).compileComponents();

    fixture = TestBed.createComponent(TurnosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
