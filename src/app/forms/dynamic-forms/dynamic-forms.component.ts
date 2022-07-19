import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dynamic-forms',
  templateUrl: './dynamic-forms.component.html',
  styleUrls: ['./dynamic-forms.component.css']
})
export class DynamicFormsComponent implements OnInit {

  linkedinform = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    experience: new FormArray([])
  });
  constructor() { }

  ngOnInit(): void {
  }

  get experienceObj(): FormArray {
    return this.linkedinform.get('experience') as FormArray;
  }

  newExperience(): any {
    return new FormGroup({
      org: new FormControl(),
      yrs: new FormControl(),
    });
  }

  addExperience(): void {
    this.experienceObj.push(this.newExperience());
  }

  removeExperience(index: number): void {
    this.experienceObj.removeAt(index);
  }

}
