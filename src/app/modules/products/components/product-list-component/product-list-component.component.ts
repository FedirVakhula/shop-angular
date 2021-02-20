import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { CartProduct, ProductModel } from 'src/app/interface/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.scss']
})
export class ProductListComponentComponent implements OnInit {
  products$: BehaviorSubject<ProductModel[]>;
  titles: Array<string>;

  @Output() buyProduct: EventEmitter<CartProduct> = new EventEmitter();
  isLoading$: BehaviorSubject<boolean>;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.products$ = this.productsService.products$;
    this.titles = this.productsService.getTableColumnTitles();
    this.isLoading$ = this.productsService.isLoading$;
  }

  onBuyProduct(newValue: CartProduct): void {
    console.log('buy products');
    this.cartService.addProduct(newValue);
  }

  onDetailsProduct(product: ProductModel): void {
    const link = ['product', product.id];
    this.router.navigate(link);
  }

  onEditProduct(product: ProductModel): void {
    const link = ['admin/products/edit', product.id];
    this.router.navigate(link);
  }
}
