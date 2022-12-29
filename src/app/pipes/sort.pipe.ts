import { Pipe, PipeTransform } from '@angular/core';
import {Product} from '../../types';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: Product[], sortBy: string, up: boolean): Product[] {

    if (!value || value.length <= 0) {
      return [];
    }

    if (!sortBy) {
      return value;
    }

    if (up) {
      value = value.sort((item1: Product, item2: Product) => {
        // @ts-ignore
        if (sortBy === 'name') {
          return item1[sortBy].localeCompare(item2[sortBy]);
        } else {
          // @ts-ignore
          return item1[sortBy] - item2[sortBy];
        }
      });
    } else {
      value = value.sort((item1: Product, item2: Product) => {
        if (sortBy === 'name') {
          return item2[sortBy].localeCompare(item1[sortBy]);
        } else {
          // @ts-ignore
          return item2[sortBy] - item1[sortBy];
        }
      });
    }

    return value;
  }

}
