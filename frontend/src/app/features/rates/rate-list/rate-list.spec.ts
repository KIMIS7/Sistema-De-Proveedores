import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateList } from './rate-list.component';

describe('RateList', () => {
  let component: RateList;
  let fixture: ComponentFixture<RateList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
