import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductModel } from 'src/app/interface/products';
import { CartService } from 'src/app/services/cart.service';

import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.scss']
})
export class ProductListComponentComponent implements OnInit {
  products: ProductModel[];
  titles: Array<string>;

  @Output() buyProduct: EventEmitter<ProductModel> = new EventEmitter();

  constructor(
    private productsServiceService: ProductsService,
    private cartServiceService: CartService
  ) { }

  ngOnInit(): void {
    this.products = this.productsServiceService.getProducts();
    this.titles = this.productsServiceService.getTableColumnTitles();
  }

  public onBuyProduct(newValue: ProductModel): void {
    console.log('buy products');
    this.buyProduct.emit(newValue);
    // this.cartServiceService.orderList.push(newValue);
    // this.cartServiceService.orderSum += newValue.price;
  }

}
