import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { CartProduct, ProductModel } from 'src/app/interface/products';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-list-component',
  templateUrl: './cart-list-component.component.html',
  styleUrls: ['./cart-list-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponentComponent implements OnChanges {
  @Input() newProduct: CartProduct;

  orderList: CartProduct[] = [];

  get orderSum(): number {
    return this.orderList.reduce((prev: number, curr: CartProduct) => curr.quantity * curr.price + prev, 0);
  }

  get orderSumQuantity(): number {
    return this.orderList.reduce((prev: number, curr: CartProduct) => +prev + +curr.quantity, 0);
  }

  trackByItems(index: number, item: ProductModel): string { return item.id; }

  constructor(private cartService: CartService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.newProduct?.currentValue) {
      this.orderList = this.cartService.compressProductList(this.newProduct);
    }
  }

  deleteProduct(value: CartProduct): void {
    this.orderList = this.cartService.deleteProduct(value);
  }

  changeQuantityProduct(prod: { product: CartProduct, quant: number }): void {
    this.orderList = this.cartService.changeQuantityProduct(prod.product, prod.quant);
  }

}
