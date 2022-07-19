import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {
// value | discount : arg1: arg2: arg3
  transform(value: number): string {
    // console.log('discountPipe calculations', value);
    return '80% off';
  }

}
