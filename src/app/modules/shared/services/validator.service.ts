import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  validationMessagesMap = new Map([
    ['firstName', {
      message: '',
      required: 'Please enter your first name.',
      minlength: 'The first name must be longer than 3 characters.'
    }],
    ['lastName', {
      message: '',
      required: 'Please enter your last name.'
    }],
    ['email', {
      message: '',
      required: 'Please enter your email address.',
      email: 'Please enter a valid email address.',
      asyncEmailInvalid:
        'This email address cannot be used. Enter your Gmail email address.'
    }],
    ['phones', {
      message: '',
      required: 'Please enter your phone number.'
    }],
  ]);


  constructor() { }


  public buildValidationMessages(c: AbstractControl, controlName: string): void {
    this.validationMessagesMap.get(controlName).message = '';

    if ((c.touched || c.dirty) && c.invalid && c.errors) {
      this.validationMessagesMap.get(controlName).message = Object.keys(c.errors)
        .map(key => this.validationMessagesMap.get(controlName)[key])
        .join(' ');
    }
  }
}
