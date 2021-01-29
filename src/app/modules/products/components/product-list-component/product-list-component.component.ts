import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { CartProduct, ProductModel } from 'src/app/interface/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.scss']
})
export class ProductListComponentComponent implements OnInit {
  products: ProductModel[];
  titles: Array<string>;

  @Output() buyProduct: EventEmitter<CartProduct> = new EventEmitter();

  constructor(
    private productsServiceService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.products = this.productsServiceService.getProducts();
    this.titles = this.productsServiceService.getTableColumnTitles();
  }

  public onBuyProduct(newValue: CartProduct): void {
    console.log('buy products');
    this.buyProduct.emit(newValue);
  }
}
