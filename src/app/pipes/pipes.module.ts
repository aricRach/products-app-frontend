import {NgModule} from '@angular/core';
import {DiscountPipe} from './discount.pipe';
import {ConversionPipe} from './conversion.pipe';
import {FilterByPipe} from './filter-by.pipe';
import { ItemTitlePipe } from './item-title.pipe';

@NgModule({
  declarations: [
    DiscountPipe,
    ConversionPipe,
    FilterByPipe,
    ItemTitlePipe,
  ],
  imports: [
  ],
    exports: [
    DiscountPipe,
    ConversionPipe,
    FilterByPipe,
    ItemTitlePipe,
    ]
})
export class PipesModule { }
