import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static clientFirstName(minLength: number): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      if (c.value !== undefined && c.value.length < minLength) {
        return {
          clientFirstName: true
        };
      }
      return null;
    }
  }
}

export function checkClientEmail(c: AbstractControl): ValidationErrors | null {
  if (c.value !== undefined) {
    const re = /[a-z0-9._%+-]+@[a-z0-9.-]+/;
    return {
      clientEmail: !re.test(c.value)
    };
  }
  return null;
}
