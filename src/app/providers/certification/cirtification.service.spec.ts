import { TestBed } from '@angular/core/testing';

import { CirtificationService } from './cirtification.service';

describe('CirtificationService', () => {
  let service: CirtificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CirtificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
