import { TestBed } from '@angular/core/testing';

import { BdayService } from './bday.service';

describe('BdayService', () => {
  let service: BdayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BdayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
