import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(value: any[], filterField: string, filterValue: string): any[] {
    if (!value || value.length <= 0) { // there is no products to filter
      return [];
    }
    if (!filterField || !filterValue || value.length <= 1) { // there is no data for the filtering
      return value;
    }
    return value.filter((val) => { // return only the products that has filterField equal to filterValue
      return String(val[filterField]).toLowerCase().includes(String(filterValue).toLowerCase());
    });
  }
}
