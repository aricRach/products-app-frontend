import { TestBed } from '@angular/core/testing';

import { MyProductsResolver } from './my-products.resolver';

describe('MyProductsResolver', () => {
  let resolver: MyProductsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MyProductsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
