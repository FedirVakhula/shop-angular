import { Injectable } from '@angular/core';
import { CartProduct } from '../interface/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // tslint:disable-next-line:variable-name
  private _cartProducts: CartProduct[] = [];
  totalSum = 0;
  totalQuantity = 0;

  constructor() {
    const value = JSON.parse(localStorage.getItem('CartProduct'));
    if (value) {
      this.cartProducts = value;
    }
    this.updateCartData();
  }

  get cartProducts(): CartProduct[] {
    return this._cartProducts;
  }

  set cartProducts(products: CartProduct[]) {
    localStorage.setItem('CartProduct', JSON.stringify(products));
    this._cartProducts = products;
  }

  addProduct(product: CartProduct): CartProduct[] {
    const cloneProducts = JSON.parse(JSON.stringify(this.cartProducts));
    const prod: CartProduct = cloneProducts.find((elem: CartProduct) => product.art === elem.art);
    if (prod) {
      prod.quantity = +prod.quantity + +product.quantity;
    } else {
      cloneProducts.push(product);
    }
    this.cartProducts = [...cloneProducts];
    this.updateCartData();
    return this.cartProducts;
  }

  removeProduct(value: CartProduct): CartProduct[] {
    const cloneProducts = JSON.parse(JSON.stringify(this.cartProducts));
    const indexProduct = this.cartProducts.indexOf(value);
    cloneProducts.splice(indexProduct, 1);
    this.cartProducts = [...cloneProducts];
    this.updateCartData();
    return this.cartProducts;
  }

  removeAllProducts(): CartProduct[] {
    this.cartProducts = [];
    this.updateCartData();
    return [...this.cartProducts];
  }

  changeQuantityProduct(prod: CartProduct, quant: number): CartProduct[] {
    const cloneProducts = JSON.parse(JSON.stringify(this.cartProducts));
    const indexProduct = this.cartProducts.indexOf(prod);
    cloneProducts[indexProduct].quantity = quant;
    this.cartProducts = [...cloneProducts];
    this.updateCartData();
    return this.cartProducts;
  }

  isEmptyCart(): boolean {
    return this.cartProducts.length === 0;
  }

  private getTotalQuantity(): void {
    this.totalQuantity = this.cartProducts.reduce((prev: number, curr: CartProduct) => +prev + +curr.quantity, 0);
  }

  private getTotalSum(): void {
    this.totalSum = this.cartProducts.reduce((prev: number, curr: CartProduct) => curr.quantity * curr.price + prev, 0);
  }

  private updateCartData(): void {
    this.getTotalQuantity();
    this.getTotalSum();
  }
}
