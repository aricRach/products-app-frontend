import { TestBed } from '@angular/core/testing';

import { CartCounterHandlerService } from './cart-counter-handler.service';

describe('CartCounterHandlerService', () => {
  let service: CartCounterHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartCounterHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
