import { Injectable } from '@angular/core';
import {CounterAction} from '../../ui/components/counter/counter-action.model';
import {DecreaseItems, IncreaseItems, RemoveFromCart} from '../cart-actions.actions';
import {Store} from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class CartCounterHandlerService {

  constructor(private store: Store) {}

  onCounterClicked(action: CounterAction): void {
    if (action.actionType === 'increase') {
      this.store.dispatch(new IncreaseItems(action));
    } else {
      if (action.numberOfItems === 1) {
        this.store.dispatch(new RemoveFromCart(action.id));
      } else{
        this.store.dispatch(new DecreaseItems(action));
      }
    }
  }
}
