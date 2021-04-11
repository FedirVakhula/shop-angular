import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ValidatorService } from 'src/app/modules/shared/services/validator.service';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.scss']
})
export class ProcessOrderComponent implements OnInit, OnDestroy {

  ordersForm: FormGroup;
  validationMessagesMap: Map<string, any>;

  private sub: Subscription;

  get firstName(): AbstractControl {
    return this.ordersForm.get('firstName');
  }

  get lastName(): AbstractControl {
    return this.ordersForm.get('lastName');
  }

  get email(): AbstractControl {
    return this.ordersForm.get('email');
  }

  get selfPickup(): AbstractControl {
    return this.ordersForm.get('selfPickup');
  }

  get adress(): AbstractControl {
    return this.ordersForm.get('adress');
  }

  get phones(): FormArray {
    return this.ordersForm.get('phones') as FormArray;
  }


  constructor(private fb: FormBuilder, private validatorService: ValidatorService) { }

  ngOnInit(): void {
    this.validationMessagesMap = this.validatorService.validationMessagesMap;
    this.buildForm();
    this.watchValueChanges();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private buildForm(): void {
    this.ordersForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required]],
      phones: this.fb.array([this.buildPhone()]),
      selfPickup: true,
      adress: ''
    });
  }

  private watchValueChanges(): void {
    this.adress.setValidators(Validators.required);
    this.sub = this.selfPickup.valueChanges.subscribe(value => {
      if (value) {
        this.adress.setValidators(Validators.required);
      } else {
        this.adress.clearValidators();
        this.adress.updateValueAndValidity();
      }
    });
    const sub = this.ordersForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(ignorValue => {
          this.setValidationMessages();
          console.log('========', this.ordersForm);
        }
      );
    this.sub.add(sub);
  }

  private setValidationMessages(controlName?: string): void {
    if (controlName) {
      this.validatorService.buildValidationMessages(this[controlName], controlName);
    }
    else {
      this.validationMessagesMap.forEach((control, cntrlName) => {
        this.validatorService.buildValidationMessages(this[cntrlName], cntrlName);
      });
    }
  }

  private buildPhone(): FormControl {
    return this.fb.control('');
  }

  public onAddPhone(): void {
    this.phones.push(this.buildPhone());
  }

  public onRemovePhone(index: number): void {
    this.phones.removeAt(index);
  }

}
