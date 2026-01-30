import { TestBed } from '@angular/core/testing';

import { TextMetrics } from './text-metrics';

describe('TextMetrics', () => {
  let service: TextMetrics;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextMetrics);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
