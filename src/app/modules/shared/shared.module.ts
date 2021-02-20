import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight.directive';
import { OrderByPipe } from './pipes/order-by.pipe';
import { MaterialAngularModule } from './material-angular/material-angular.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [HighlightDirective, OrderByPipe],
  imports: [
    CommonModule,
    MaterialAngularModule,
    FormsModule,
  ],
  exports: [
    HighlightDirective,
    MaterialAngularModule,
    OrderByPipe,
    FormsModule,
  ]
})
export class SharedModule { }
