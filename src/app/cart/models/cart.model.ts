import {CartItem} from './cart-item.model';

export interface Cart {
  cartItems: CartItem[];
  buyerEmail: string;
}
