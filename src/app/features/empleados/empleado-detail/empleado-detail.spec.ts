import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoDetail } from './empleado-detail';

describe('EmpleadoDetail', () => {
  let component: EmpleadoDetail;
  let fixture: ComponentFixture<EmpleadoDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadoDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpleadoDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
