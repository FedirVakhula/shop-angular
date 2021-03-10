import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ProductModel } from '../interface/products';

@Injectable({
  providedIn: 'root'
})
export class ApiProductsService {
  private productsUrl = 'http://localhost:3000/products';
  products$ = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  getProducts(): Promise<ProductModel[]> {
    return this.http
      .get(this.productsUrl)
      .pipe(delay(2000))
      .toPromise()
      .then(response => response as ProductModel[]);
  }

  getProduct(id: string): Promise<ProductModel> {
    const url = `${this.productsUrl}/${id}`;

    return this.http
      .get(url)
      .toPromise()
      .then(response => response as ProductModel);
  }

  updateProducts(product: ProductModel): Promise<ProductModel> {
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<ProductModel>(url, product).toPromise();
  }
}
