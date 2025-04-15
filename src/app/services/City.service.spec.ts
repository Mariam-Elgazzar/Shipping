/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CityService } from './City.service';
// import { CityService } from './City.service';

describe('Service: City', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CityService],
    });
  });

  it('should ...', inject([CityService], (service: CityService) => {
    expect(service).toBeTruthy();
  }));
});
