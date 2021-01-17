import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstComponentComponent } from './components/first-component/first-component.component';
import { ProductComponentComponent } from './components/product-component/product-component.component';
import { ProductListComponentComponent } from './components/product-list-component/product-list-component.component';
import { CartListComponentComponent } from './components/cart-list-component/cart-list-component.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstComponentComponent,
    ProductComponentComponent,
    ProductListComponentComponent,
    CartListComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
