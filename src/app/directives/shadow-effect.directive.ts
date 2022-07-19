import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appShadowEffect]'
})
export class ShadowEffectDirective {

  @HostBinding('class.shadow') isEffectApplied = false;

  @HostListener('mouseover')
  addEffect(): void {
    this.isEffectApplied = true;
  }

  @HostListener('mouseout')
  removeEffect(): void {
    this.isEffectApplied = false;
  }
  constructor() { }

}
