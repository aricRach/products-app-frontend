import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearchResults'
})
export class HighlightSearchResultsPipe implements PipeTransform {

  transform(value: string, searchTerm: string): any {

    if (!searchTerm) {
      return value;
    }
    return value.replace(new RegExp(searchTerm, 'gi'), `<span class="highlight">${searchTerm}</span>`);
  }

}
