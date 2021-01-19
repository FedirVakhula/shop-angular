import { Injectable } from '@angular/core';

import { ProductModel } from '../interface/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  orderList: ProductModel[] = [];
  orderSum = 0;

  constructor() { }
}
// линтер
