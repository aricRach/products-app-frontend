import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'calculateDiscount'
})
export class DiscountPipe implements PipeTransform {
// value | discount : arg1: arg2: arg3
  transform(value: number, discountPercent?: number): number {
    // console.log('discountPipe calculations', value);
    // return '80% off';
    return +(discountPercent ? value - value * discountPercent / 100 : value);
  }
}
