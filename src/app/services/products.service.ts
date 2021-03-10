import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ProductModel } from '../interface/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: ProductModel[] = [];

  titles: Array<string> = ['article', 'category', 'name', 'model', 'description', 'color', 'price', 'quantity', 'order'];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() { }

  getTableColumnTitles(): Array<string> {
    return this.titles;
  }

  getProduct(id: string): ProductModel {
    return this.products.find((product: ProductModel) => product.id === id);
  }

  updateProducts(product: ProductModel): void {
    const i = this.products.findIndex(prod => prod.id === product.id);

    if (i > -1) {
      this.products.splice(i, 1, product);
    }
  }
}
