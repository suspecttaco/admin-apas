import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EscuelasList } from './escuelas-list';

describe('EscuelasList', () => {
  let component: EscuelasList;
  let fixture: ComponentFixture<EscuelasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EscuelasList],
    }).compileComponents();

    fixture = TestBed.createComponent(EscuelasList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
