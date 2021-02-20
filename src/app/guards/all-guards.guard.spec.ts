import { TestBed } from '@angular/core/testing';

import { AllGuards } from './all-guards.guard';

describe('IsCartEmptyGuard', () => {
  let guard: AllGuards;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AllGuards);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
