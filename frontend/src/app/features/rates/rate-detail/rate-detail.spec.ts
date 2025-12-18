import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RateDetail } from './rate-detail.component';

describe('RateDetail', () => {
  let component: RateDetail;
  let fixture: ComponentFixture<RateDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RateDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RateDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
