import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasList } from './estadisticas-list';

describe('EstadisticasList', () => {
  let component: EstadisticasList;
  let fixture: ComponentFixture<EstadisticasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadisticasList],
    }).compileComponents();

    fixture = TestBed.createComponent(EstadisticasList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
