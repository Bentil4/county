import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LimitAlert } from './limit-alert';

describe('LimitAlert', () => {
  let component: LimitAlert;
  let fixture: ComponentFixture<LimitAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LimitAlert]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LimitAlert);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
