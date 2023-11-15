import { TestBed } from '@angular/core/testing';

import { PasswordMatchingService } from './password-matching.service';

describe('PasswordMatchingService', () => {
  let service: PasswordMatchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordMatchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
