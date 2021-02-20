import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { CartProduct, ProductModel } from 'src/app/interface/products';
import { CartService } from 'src/app/services/cart.service';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product$: Observable<ProductModel>;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.product$ = this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => of(this.productsService.getProduct(params.get('id')))));
  }

  onBuyProduct(): void {
    this.product$.subscribe((newValue) => {
      const newProduct: CartProduct = { ...newValue, quantity: 1 };
      this.cartService.addProduct(newProduct);
    });
  }

}
