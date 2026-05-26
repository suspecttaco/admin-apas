import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosView } from './horarios-view';

describe('HorariosView', () => {
  let component: HorariosView;
  let fixture: ComponentFixture<HorariosView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorariosView],
    }).compileComponents();

    fixture = TestBed.createComponent(HorariosView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
