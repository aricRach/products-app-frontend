import {User} from './app/user/models/user.model';

export interface Product {
  id?: number;
  name: string;
  userOwner: string;
  image?: string;
  price: number;
  stock: number;
  discountPercent: number;
  finalPrice?: number;
  date?: Date;
}

export interface ProductBackEnd extends Omit<Product, 'userOwner'>{
  userOwner: User;
}
