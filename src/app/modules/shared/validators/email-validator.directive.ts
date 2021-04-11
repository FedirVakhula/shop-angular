import { Directive } from '@angular/core';
import { Validator, AbstractControl, Validators, NG_ASYNC_VALIDATORS } from '@angular/forms';

import { Observable } from 'rxjs';
import { distinctUntilChanged, first } from 'rxjs/operators';

@Directive({
    selector: '[appAsyncEmailValidator][formControlName], [appAsyncEmailValidator][ngModel]',
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: EmailValidatorDirective,
            multi: true
        }
    ]
})
export class EmailValidatorDirective implements Validator {
    validate(c: AbstractControl): Promise<{ [key: string]: any }> | Observable<{ [key: string]: any }> {
        c.setValidators(Validators.email);
        return this.validateEmailObservable(c.value).pipe(
            distinctUntilChanged(),
            first()
        );
    }

    private validateEmailObservable(email: string): Observable<any> {

        const emailArr = email.split('@');

        return new Observable(observer => {
            if (emailArr[emailArr.length - 1] === 'gmail.com') {
                observer.next(null);
            } else {
                observer.next({ asyncEmailInvalid: true });
            }
        });
    }
}
