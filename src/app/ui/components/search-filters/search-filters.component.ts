import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SortByOption} from './sort-by-option.model';

@Component({
  selector: 'app-search-filters',
  templateUrl: './search-filters.component.html',
  styleUrls: ['./search-filters.component.css']
})
export class SearchFiltersComponent implements OnInit {

  @Input() sortByOptions: SortByOption[];
  @Output() isInSaleChanged = new EventEmitter();
  @Output() sortDirectionChanged = new EventEmitter();
  @Output() sortByChanged = new EventEmitter();

  sortBy: string;
  isInSale: boolean;
  min: number;
  max: number;

  up: boolean;

  constructor() {
  }

  ngOnInit(): void {
  }

  onIsInSaleChanged(event: boolean): void {
    this.isInSaleChanged.emit(event);
  }
  //
  // onSortDirectionChanged(event: boolean): void {
  //   this.sortDirectionChanged.emit(event);
  // }

  onSortByChanged(value: string): void {
    this.sortByChanged.emit(value);
  }

  onSortDirectionChanged(): void {
    this.up = !this.up;
    this.sortDirectionChanged.emit(this.up);
  }
}
