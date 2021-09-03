/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AppVariableService } from './app-variable.service';

describe('Service: AppVariable', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppVariableService]
    });
  });

  it('should ...', inject([AppVariableService], (service: AppVariableService) => {
    expect(service).toBeTruthy();
  }));
});
