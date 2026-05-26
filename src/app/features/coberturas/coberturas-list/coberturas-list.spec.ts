import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoberturasList } from './coberturas-list';

describe('CoberturasList', () => {
  let component: CoberturasList;
  let fixture: ComponentFixture<CoberturasList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoberturasList],
    }).compileComponents();

    fixture = TestBed.createComponent(CoberturasList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
