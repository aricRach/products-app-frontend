import {FormGroup} from '@angular/forms';

export function checkFieldsMatch(field1: string, field2: string): any {
  return (form: FormGroup) => {
    if (form.get(field1).dirty && form.get(field2).dirty) {
      const val1 = form.get(field1).value;
      const val2 = form.get(field2).value;
      if (val1 !== val2) {
        const error = {not_match: `${val1} is not equal to ${val2}`};
        form.get(field1).setErrors(error);
        form.get(field2).setErrors(error);
        return error;
      }
    }
    if (form.get(field1).hasError('not_match')) {
      delete form.get(field1).errors.not_match;
      form.get(field1).updateValueAndValidity();
    }

    if (form.get(field2).hasError('not_match')) {
      delete form.get(field2).errors.not_match;
      form.get(field2).updateValueAndValidity();
    }
    return null;
  };
}
