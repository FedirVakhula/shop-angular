import { Component, OnInit } from '@angular/core';

import { ProductModel } from './interface/products';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  orderList: ProductModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onBuyProduct(value: ProductModel): void {
    this.orderList.push(value);
  }

  deliteProduct(value: ProductModel): void {
    const indexProduct = this.orderList.indexOf(value);
    this.orderList.splice(indexProduct, 1);
  }
}
