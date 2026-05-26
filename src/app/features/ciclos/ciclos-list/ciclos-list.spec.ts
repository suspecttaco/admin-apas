import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CiclosList } from './ciclos-list';

describe('CiclosList', () => {
  let component: CiclosList;
  let fixture: ComponentFixture<CiclosList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CiclosList],
    }).compileComponents();

    fixture = TestBed.createComponent(CiclosList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
