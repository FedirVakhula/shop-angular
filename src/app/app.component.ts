import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { CartProduct } from './interface/products';
import { ProductsModule } from './modules/products/products.module';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  newProduct: CartProduct;
  orderList: ProductsModule[];

  @ViewChild('appTitle') appTitle: ElementRef;

  constructor( private cartService: CartService) { }

  ngAfterViewInit(): void {
    this.appTitle.nativeElement.innerText = 'Title';
  }

  ngOnInit(): void {
    this.orderList = this.cartService.cartProducts;
  }

  onBuyProduct(value: CartProduct): void {
    this.newProduct = value;
  }
}
