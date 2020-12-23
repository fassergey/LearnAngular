import { Directive } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors, NG_VALIDATORS } from '@angular/forms';

import { checkClientEmail } from './custom.validators';

@Directive({
  selector: '[appClientEmailValidator]',
  providers: [{
      provide: NG_VALIDATORS,
      useExisting: ClientEmailDirective,
      multi: true
  }]
})
export class ClientEmailDirective implements Validator {

  validate(c: AbstractControl): ValidationErrors | null {
    return checkClientEmail(c);
  }
}
