// custom validation functions

import {AbstractControl} from '@angular/forms';

export function zipcodeValidator(): any {
  return (control: AbstractControl) => {
    // tslint:disable-next-line:triple-equals
    if (control.value == 123456) {
      return null; // means there is no errors
    }
    return {
      zipCode: {
        allowedCode: 123456,
        enteredCode: control.value
      }
    };
  };
}
