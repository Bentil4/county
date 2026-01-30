import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsBar } from './options-bar';

describe('OptionsBar', () => {
  let component: OptionsBar;
  let fixture: ComponentFixture<OptionsBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionsBar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
