import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CartProduct, ProductModel } from 'src/app/interface/products';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() product: CartProduct;
  @Output() deleteProduct: EventEmitter<ProductModel> = new EventEmitter();
  @Output() changeQuantityProduct: EventEmitter<{ product: CartProduct, quant: number }> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  // корректное название метода?
  deletePrpduct(value: ProductModel): void {
    this.deleteProduct.emit(value);
  }

  changeQuantity(product: CartProduct, quant: number): void {
    this.changeQuantityProduct.emit({ product, quant });
  }

  onBlurMethod(product: CartProduct, quant: number): void {
    this.changeQuantity(product, quant);
  }
  onWheelMethod(product: CartProduct, quant: number): void {
    this.changeQuantity(product, quant);
  }
}
