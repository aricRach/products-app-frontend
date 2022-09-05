import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversion'
})
export class ConversionPipe implements PipeTransform {

  transform(value: number|string, code: string): number {
    let val = Number(value);
    switch (code) {
      case 'USD' :
        val *= 0.013;
        break;
      case 'EUR':
        val *= 0.012;
        break;
      case 'GBP':
        val *= 0.011;
        break;
      case 'CAD':
        val *= 0.017;
        break;
      default:
        return val;
    }
    return +val.toFixed(2);
  }

}
