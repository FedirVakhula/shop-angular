import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CartProduct, ProductModel } from 'src/app/interface/products';
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

  constructor(
    private productsService: ProductsService,
  ) { }

  ngOnInit(): void {
    this.products$ = this.productsService.products$;
    this.titles = this.productsService.getTableColumnTitles();
  }

  public onBuyProduct(newValue: CartProduct): void {
    console.log('buy products');
    this.buyProduct.emit(newValue);
  }
}
