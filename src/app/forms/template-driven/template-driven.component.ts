import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent implements OnInit {

  submitted = false;
  constructor() { }

  ngOnInit(): void {
  }

  postDataToServer(formObj: NgForm): void {
    this.submitted = true;
    if (formObj.valid) {
      console.log('form submission logic here', formObj.value);
    } else {
      console.log('form isn\'t valid');
    }
  }

  loadData(formObj: NgForm): void {
    const data = {
      name: 'demo', age: '12'
    };
    formObj.form.setValue(data);
  }

  patchData(formObj: NgForm): void {
    const data = {
      name: 'demo'
    };
    formObj.form.patchValue(data);
  }

}
