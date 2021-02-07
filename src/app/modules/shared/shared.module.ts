import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { MaterialAngularModule } from './material-angular/material-angular.module';



@NgModule({
  declarations: [HighlightDirective, OrderByPipe],
  imports: [
    CommonModule,
    MaterialAngularModule
  ],
  exports: [
    HighlightDirective,
    MaterialAngularModule,
    OrderByPipe
  ]
})
export class SharedModule { }
