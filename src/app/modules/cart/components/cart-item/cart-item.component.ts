import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CartProduct, ProductModel } from 'src/app/interface/products';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})
export class CartItemComponent implements OnInit {
  @Input() product: CartProduct;
  @Output() deleteProductEmit: EventEmitter<ProductModel> = new EventEmitter();
  @Output() changeQuantityProduct: EventEmitter<{ product: CartProduct, quant: number }> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  deleteProduct(value: ProductModel): void {
    this.deleteProductEmit.emit(value);
  }

  changeQuantity(product: CartProduct, quant: number): void {
    this.changeQuantityProduct.emit({ product, quant: +quant });
  }

  onBlurMethod(product: CartProduct, quant: number): void {
    this.changeQuantity(product, quant);
  }
  onWheelMethod(product: CartProduct, quant: number): void {
    this.changeQuantity(product, quant);
  }
}
