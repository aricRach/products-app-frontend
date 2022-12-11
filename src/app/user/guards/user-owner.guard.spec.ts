import { TestBed } from '@angular/core/testing';

import { UserOwnerGuard } from './user-owner.guard';

describe('UserOwnerGuard', () => {
  let guard: UserOwnerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UserOwnerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
