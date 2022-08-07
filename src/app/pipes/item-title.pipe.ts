import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemTitle'
})
export class ItemTitlePipe implements PipeTransform {

  transform(value: string, maxLength = 25): string {
    const currentLength = value.length;
    const title = value.substring(0, maxLength);
    return title.length < currentLength ? title + '...' : title;
  }

}
