import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appNumbersOnly]'
})
export class NumbersOnlyDirective {

  @HostListener('keypress', ['$event'])
  restrictToNumbersOnly(event: KeyboardEvent): void {
    if (event.keyCode < 48 || event.keyCode > 57) {
      event.preventDefault();
    }
  }
  constructor() { }

}
