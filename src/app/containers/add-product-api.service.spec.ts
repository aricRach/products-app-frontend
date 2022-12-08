import { TestBed } from '@angular/core/testing';

import { AddProductApiService } from './add-product-api.service';

describe('AddProductApiService', () => {
  let service: AddProductApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProductApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
