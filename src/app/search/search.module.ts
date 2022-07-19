import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubSearchComponent } from './github-search/github-search.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    GithubSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class SearchModule { }
