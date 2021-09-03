/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LegalService } from './legal.service';

describe('Service: Legal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LegalService]
    });
  });

  it('should ...', inject([LegalService], (service: LegalService) => {
    expect(service).toBeTruthy();
  }));
});
