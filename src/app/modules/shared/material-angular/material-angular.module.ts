import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatSlideToggleModule,
    MatProgressSpinnerModule
  ]
})
export class MaterialAngularModule { }
