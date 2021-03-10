import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { CartProduct, ProductModel } from 'src/app/interface/products';
import { ApiProductsService } from 'src/app/services/api-products.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.scss']
})
export class ProductListComponentComponent implements OnInit {
  products: ProductModel[] = [];
  titles: Array<string>;

  @Output() buyProduct: EventEmitter<CartProduct> = new EventEmitter();
  isLoading$: BehaviorSubject<boolean>;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private router: Router,
    private api: ApiProductsService
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this.productsService.isLoading$;
    this.products = this.productsService.products;
    if (!this.products.length) {
      this.isLoading$.next(true);
      this.api.getProducts()
        .then((products: ProductModel[]) => {
          this.products = products;
          this.productsService.products = products;
        })
        .finally(() => this.isLoading$.next(false));
    }
    this.titles = this.productsService.getTableColumnTitles();
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
