import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversion'
})
export class ConversionPipe implements PipeTransform {

  transform(value: number|string, code: string): number {
    let val = Number(value);
    switch (code) {
      case 'USD' :
        return val *= 0.013;
        break;
      case 'EUR':
        return val *= 0.012;
      case 'GBP':
        return val *= 0.011;
      case 'CAD':
        return val *= 0.017;
      default:
        return val;
    }
  }

}
