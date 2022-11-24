import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'conversion'
})
export class ConversionPipe implements PipeTransform {

  cad = 60.99;
  gbp = 96.99;
  euro = 83.97;
  usd  = 81.71;

  transform(value: number|string, code: string, toInr?: boolean): number {
    let val = Number(value);
    switch (code) {
      case 'USD' :
        toInr ? val *= this.usd : val *= 1 / this.usd;
        break;
      case 'EUR':
        toInr ? val *= this.euro : val *= 1 / this.euro;
        break;
      case 'GBP':
        toInr ? val *= this.gbp : val *= 1 / this.gbp;
        break;
      case 'CAD':
        toInr ? val *= this.cad : val *= 1 / this.cad;
        break;
      default:
        return val;
    }
    return +val.toFixed(2);
  }
  //
  // // tslint:disable-next-line:typedef
  // convertToInr(value: number|string, code: string) {
  //   let val = Number(value);
  //   switch (code) {
  //     case 'USD' :
  //       val *= this.usd;
  //       break;
  //     case 'EUR':
  //       val *= this.euro;
  //       break;
  //     case 'GBP':
  //       val *= this.gbp;
  //       break;
  //     case 'CAD':
  //       val *= this.cad;
  //       break;
  //     default:
  //       return val;
  //   }
  //   return +val;
  // }

}
