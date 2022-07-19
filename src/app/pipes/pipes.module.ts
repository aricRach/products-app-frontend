import {NgModule} from '@angular/core';
import {DiscountPipe} from './discount.pipe';
import {ConversionPipe} from './conversion.pipe';
import {FilterByPipe} from './filter-by.pipe';

@NgModule({
  declarations: [
    DiscountPipe,
    ConversionPipe,
    FilterByPipe,
  ],
  imports: [
  ],
  exports: [
    DiscountPipe,
    ConversionPipe,
    FilterByPipe,
  ]
})
export class PipesModule { }
