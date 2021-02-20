import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { CartProduct, ProductModel } from 'src/app/interface/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart-list-component',
  templateUrl: './cart-list-component.component.html',
  styleUrls: ['./cart-list-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartListComponentComponent implements OnInit {

  orderList: CartProduct[] = [];
  titles: Array<string>;
  sortBy: Array<string> = [];
  sortUpDown = false;

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

  constructor(
    private cartService: CartService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.titles = this.productsService.getTableColumnTitles();
    this.orderList = this.cartService.cartProducts;
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

  onToggleChange(checked: MatSlideToggleChange): void {
    if (checked.checked) {
      this.sortBy.push(checked.source.name);
      this.sortBy = [...this.sortBy];

    } else {
      const inex = this.sortBy.indexOf(checked.source.name);
      this.sortBy.splice(inex, 1);
      this.sortBy = [...this.sortBy];
    }
  }

  changeSortStrategy(checked: MatSlideToggleChange): void {
    this.sortUpDown = checked.checked;
  }
}
