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
    return this.cartService.totalSum;
  }

  get orderSumQuantity(): number {
    return this.cartService.totalQuantity;
  }

  get isEmpty(): boolean {
    return this.cartService.isEmptyCart();
  }

  trackByItems(index: number, item: ProductModel): string { return item.id; }

  constructor(private cartService: CartService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.newProduct?.currentValue) {
      this.orderList = this.cartService.addProduct(this.newProduct);
    }
  }

  deleteProduct(value: CartProduct): void {
    this.orderList = this.cartService.removeProduct(value);
  }

  changeQuantityProduct(prod: { product: CartProduct, quant: number }): void {
    this.orderList = this.cartService.changeQuantityProduct(prod.product, prod.quant);
  }

  removeAllProducts(): void {
    this.orderList = this.cartService.removeAllProducts();
  }

}
