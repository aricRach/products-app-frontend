import {CartItem} from './models/cart-item.model';

export class AddToCart {
  static readonly type = '[Product List] Add to cart';
  constructor(public payload: CartItem) {}
}

export class RemoveFromCart {
  static readonly type = '[Product List] Remove from cart';
  constructor(public payload: CartItem) {}
}

export class EmptyCart {
  static readonly type = '[Cart] Empty cart';
}
