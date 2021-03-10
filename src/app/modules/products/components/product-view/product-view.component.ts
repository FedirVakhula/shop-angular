import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { first } from 'rxjs/operators';

import { CartProduct, ProductModel } from 'src/app/interface/products';
import { ApiProductsService } from 'src/app/services/api-products.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {
  product: Promise<ProductModel>;
  productLocal: ProductModel;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private api: ApiProductsService
  ) { }

  ngOnInit(): void {
    this.product = this.route.params.pipe(first())
      .toPromise()
      .then((params: any) => this.api.getProduct(params.id))
      .then((product) => this.productLocal = product);
  }

  onBuyProduct(): void {
    const newProduct: CartProduct = { ...this.productLocal, quantity: 1 };
    this.cartService.addProduct(newProduct);
  }

}
