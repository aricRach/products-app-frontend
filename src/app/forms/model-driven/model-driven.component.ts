import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {zipcodeValidator} from '../validators';

@Component({
  selector: 'app-model-driven',
  templateUrl: './model-driven.component.html',
  styleUrls: ['./model-driven.component.css']
})
export class ModelDrivenComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    age: new FormControl(21, [Validators.required]),
    email: new FormControl(null, {updateOn: 'blur', validators: [Validators.required]}),
    address: new FormGroup({
      street: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      zipcode: new FormControl(null, [Validators.required, zipcodeValidator()]),
    })
    },
    {
      updateOn: 'submit'
    }
  );
  constructor() { }

  ngOnInit(): void {
  }

  saveData(): void {
    if (this.userForm.valid) {
      console.log('form data', this.userForm.value);
    }
  }
}
