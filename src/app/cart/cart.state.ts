import {CartStateModel} from './models/cart-state-model.model';
import {AddToCart, EmptyCart, RemoveFromCart} from './cart-actions.actions';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {CartItem} from './models/cart-item.model';

@State<CartStateModel>({
  name: 'cartItems',
  defaults: {
    cartItems: [],
  },
})
export class CartState {

  @Selector()
  static getCartItems(state: CartStateModel): CartItem[] {
    return state.cartItems;
  }

  @Action(AddToCart)
  addProduct(ctx: StateContext<CartStateModel>, action: AddToCart): void {
    const state = ctx.getState();
    const isAlreadyExist = state.cartItems.some((item: CartItem) => {
      return item.productId === action.payload.productId;
    });
    if (!isAlreadyExist) {
      ctx.patchState({
        cartItems: [...state.cartItems, action.payload],
      });
    } else {
      console.log('item is already exist');
    }
  }

  @Action(RemoveFromCart)
  removeProduct(ctx: StateContext<CartStateModel>, action: RemoveFromCart): void {
    const state = ctx.getState();
    ctx.patchState({
      cartItems: state.cartItems.filter((item: CartItem) => {
          return item.productId !== action.payload.productId;
      })
    });
  }

  @Action(EmptyCart)
  emptyCart(ctx: StateContext<CartStateModel>): void {
    ctx.setState({cartItems: []});
  }
}


