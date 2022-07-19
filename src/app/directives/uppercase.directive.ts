import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {

  @HostListener('keyup', ['$event'])
  changeCase(event: Event): void {
    const txtBox = event.target as HTMLInputElement;
    txtBox.value = txtBox.value.toUpperCase();
  }
  constructor() { }

}
