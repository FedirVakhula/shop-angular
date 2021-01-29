import { Injectable } from '@angular/core';
import { CartProduct } from '../interface/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  orderList: CartProduct[] = [];
  orderSum = 0;

  constructor() { }

  compressProductList(product: CartProduct): CartProduct[] {
    const prod: CartProduct = this.orderList.find((elem: CartProduct) => product.art === elem.art);
    if (prod) {
      prod.quantity = +prod.quantity + +product.quantity;
    } else {
      this.orderList.push(product);
    }
    return [...this.orderList];
  }

  deleteProduct(value: CartProduct): CartProduct[] {
    const indexProduct = this.orderList.indexOf(value);
    this.orderList.splice(indexProduct, 1);
    return [...this.orderList];
  }

  changeQuantityProduct(prod: CartProduct, quant: number): CartProduct[] {
    const indexProduct = this.orderList.indexOf(prod);
    this.orderList[indexProduct].quantity = quant;
    return [...this.orderList];
  }
}
