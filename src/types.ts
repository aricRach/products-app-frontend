import {User} from './app/user/models/user.model';

export type Product = {
  id?: number;
  name: string;
  userOwner: User;
  image?: string;
  price: number;
  stock: number;
  discountPercent: number,
  finalPrice?: number,
  date?: Date
};
