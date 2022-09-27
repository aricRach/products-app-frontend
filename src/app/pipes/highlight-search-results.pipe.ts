import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearchResults'
})
export class HighlightSearchResultsPipe implements PipeTransform {

  transform(value: string, searchTerm: string): any {

    if (!searchTerm) {
      return value;
    }
    // const result = new RegExp(searchTerm, 'gi');
    // return value.replace(result, '<mark>$&</mark>');
    return value.replace(searchTerm, `<span class="aric">${searchTerm}</span>`);
  }

}
