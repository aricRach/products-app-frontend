import {Directive, Input, Output, EventEmitter} from '@angular/core';
import {SortDirection} from '@angular/material/sort';
import {PurchaseProduct} from '../containers/orders-history/models/purchase-product.model';


const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

export const compare = (val1: string | number | Date, val2: string | number | Date) => {
  if ((typeof val1) === 'object' && (typeof val2) === 'object') {
        val1 = (val1 as Date).getTime();
        val2 = (val2 as Date).getTime();
  }
  return (val1 < val2 ? -1 : val1 > val2 ? 1 : 0);
};

export interface SortEvent {
  column: keyof PurchaseProduct | '';
  direction: SortDirection;
}

@Directive({
  selector: '[appSortable]',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class SortableHeaderDirective {

  @Input() sortable: any = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate(): void {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}

