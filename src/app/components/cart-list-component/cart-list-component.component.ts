import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProductModel } from 'src/app/interface/products';

@Component({
  selector: 'app-cart-list-component',
  templateUrl: './cart-list-component.component.html',
  styleUrls: ['./cart-list-component.component.scss']
})
export class CartListComponentComponent {
  @Input() orderList: ProductModel[];
  @Output() deliteProduct: EventEmitter<ProductModel> = new EventEmitter();

  get orderSum(): number {
    return this.orderList.reduce((prev, curr) => prev + curr.price, 0);
  }
  trackByItems(index: number, item: ProductModel): string { return item.id; }

  constructor() { }

  // delete?
  delitePrpduct(value: ProductModel): void{
    this.deliteProduct.emit(value);
  }

}
