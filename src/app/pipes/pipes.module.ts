import {NgModule} from '@angular/core';
import {DiscountPipe} from './discount.pipe';
import {ConversionPipe} from './conversion.pipe';
import {FilterByPipe} from './filter-by.pipe';
import { ItemTitlePipe } from './item-title.pipe';
import { HighlightSearchResultsPipe } from './highlight-search-results.pipe';

@NgModule({
  declarations: [
    DiscountPipe,
    ConversionPipe,
    FilterByPipe,
    ItemTitlePipe,
    HighlightSearchResultsPipe,
  ],
  providers: [
    ConversionPipe
  ],
  imports: [
  ],
    exports: [
        DiscountPipe,
        ConversionPipe,
        FilterByPipe,
        ItemTitlePipe,
        HighlightSearchResultsPipe,
    ]
})
export class PipesModule { }
