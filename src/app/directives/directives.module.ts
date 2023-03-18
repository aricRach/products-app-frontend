import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NumbersOnlyDirective} from './numbers-only.directive';
import {ShadowEffectDirective} from './shadow-effect.directive';
import {SortableHeaderDirective} from './sortable-header.directive';
import {UppercaseDirective} from './uppercase.directive';

@NgModule({
  declarations: [
    NumbersOnlyDirective,
    ShadowEffectDirective,
    SortableHeaderDirective,
    UppercaseDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NumbersOnlyDirective,
    ShadowEffectDirective,
    SortableHeaderDirective,
    UppercaseDirective
  ]
})
export class DirectivesModule { }
