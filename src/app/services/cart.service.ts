import { Injectable } from '@angular/core';
import { ProductModel } from '../interface/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  orderList: ProductModel[] = [];
  orderSum: number = 0;

  constructor() { }
}
