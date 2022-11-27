import {Product} from '../../../types';

export interface CartItem extends Product{
  numberOfItems: number;
}
