import {CartItem} from './models/cart-item.model';
import {CounterAction} from '../ui/components/counter/counter-action.model';

export class AddToCart {
  static readonly type = '[Product List] Add to cart';
  constructor(public payload: CartItem) {}
}

export class RemoveFromCart {
  static readonly type = '[Product List] Remove from cart';
  constructor(public id: number) {}
}

export class EmptyCart {
  static readonly type = '[Cart] Empty cart';
}

export class IncreaseItems {
  static readonly type = '[Cart] increase cart item';
  constructor(public payload: CounterAction) {}
}

export class DecreaseItems {
  static readonly type = '[Cart] decrease cart item';
  constructor(public payload: CounterAction) {}
}
