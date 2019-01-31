/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiRestService } from './api-rest.service';

describe('Service: ApiRest', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiRestService]
    });
  });

  it('should ...', inject([ApiRestService], (service: ApiRestService) => {
    expect(service).toBeTruthy();
  }));
});
