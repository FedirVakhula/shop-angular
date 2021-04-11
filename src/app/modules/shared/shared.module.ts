import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { MaterialAngularModule } from './material-angular/material-angular.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailValidatorDirective } from './validators/email-validator.directive';

@NgModule({
  declarations: [HighlightDirective, OrderByPipe, EmailValidatorDirective],
  imports: [
    CommonModule,
    MaterialAngularModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    HighlightDirective,
    MaterialAngularModule,
    OrderByPipe,
    ReactiveFormsModule,
    EmailValidatorDirective,
    FormsModule,
  ]
})
export class SharedModule { }
