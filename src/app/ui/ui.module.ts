import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ModalsModule} from './components/modals/modals.module';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule, ModalsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
  ]
})
export class UiModule { }
