import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../../types';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(value: Product[], filterField: string[], filterValue: string[]): any[] {
    if (!value || value.length <= 0) { // there is no products to filter
      return [];
    }
    if (filterValue[1] === 'true') { // isInSale filter
      value = value.filter((item: Product) => {
        return item.discountPercent > 0;
      });
    }
    if (!filterField || !filterValue || value.length <= 1) { // there is no data for the filtering
      return value;
    }
    return value.filter((val) => { // return only the products that has filterField equal to filterValue
      // @ts-ignore
      return String(val[filterField[0]]).toLowerCase().includes(String(filterValue[0]).toLowerCase());
    });
  }
}
