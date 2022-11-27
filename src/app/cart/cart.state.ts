import {CartStateModel} from './models/cart-state-model.model';
import {AddToCart, DecreaseItems, EmptyCart, IncreaseItems, RemoveFromCart} from './cart-actions.actions';
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

  @Selector()
  static getCartTotalPrice(state: CartStateModel): number {
    let totalPrice = 0;
    for (const item of state.cartItems) {
      // console.log(item);
      // totalPrice += item.discountPercent > 0 ? (item.price - item.price * (item.discountPercent / 100)) * item.numberOfItems
      //   : item.price * item.numberOfItems;
      totalPrice += item.finalPrice * item.numberOfItems;
    }
    return totalPrice;
  }

  @Selector()
  static isCartEmpty(state: CartStateModel): boolean {
    return state.cartItems.length === 0;
  }

  @Action(AddToCart)
  addProduct(ctx: StateContext<CartStateModel>, action: AddToCart): void {
    const state = ctx.getState();
    const isAlreadyExist = state.cartItems.some((item: CartItem) => {
      return item.id === action.payload.id;
    });
    if (!isAlreadyExist) {
      if (action.payload.numberOfItems == null) {
        action.payload.numberOfItems = 1;
      }
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
          return item.id !== action.id;
      })
    });
  }

  @Action(EmptyCart)
  emptyCart(ctx: StateContext<CartStateModel>): void {
    ctx.setState({cartItems: []});
  }

  @Action(IncreaseItems)
  increaseCartItem(ctx: StateContext<CartStateModel>, action: IncreaseItems): void {
    const state = ctx.getState();
    ctx.patchState({
      cartItems: [...state.cartItems.map((item: CartItem) => {
        if (item.id === action.payload.id) {
          return {...item, numberOfItems: item.numberOfItems + 1};
        }
        return item;
      })]
    });
  }

  @Action(DecreaseItems)
  decreaseCartItem(ctx: StateContext<CartStateModel>, action: DecreaseItems): void {
    const state = ctx.getState();
    ctx.patchState({
      cartItems: [...state.cartItems.map((item: CartItem) => {
        if (item.id === action.payload.id) {
          return {...item, numberOfItems: item.numberOfItems > 0 ? item.numberOfItems - 1 : 0};
        }
        return item;
      })]
    });
  }
}


