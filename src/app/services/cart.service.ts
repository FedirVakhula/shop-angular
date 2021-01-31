import { Injectable } from '@angular/core';
import { CartProduct } from '../interface/products';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartProducts: CartProduct[] = [];
  totalSum = 0;
  totalQuantity = 0;

  constructor() { }

  getProducts(): CartProduct[] {
    return this.cartProducts;
  }

  addProduct(product: CartProduct): CartProduct[] {
    const prod: CartProduct = this.cartProducts.find((elem: CartProduct) => product.art === elem.art);
    if (prod) {
      prod.quantity = +prod.quantity + +product.quantity;
    } else {
      this.cartProducts.push(product);
    }
    this.cartProducts = [...this.cartProducts];
    this.updateCartData();
    return this.cartProducts;
  }

  removeProduct(value: CartProduct): CartProduct[] {
    const indexProduct = this.cartProducts.indexOf(value);
    this.cartProducts.splice(indexProduct, 1);
    this.updateCartData();
    return [...this.cartProducts];
  }

  removeAllProducts(): CartProduct[] {
    this.cartProducts = [];
    this.updateCartData();
    return [...this.cartProducts];
  }

  changeQuantityProduct(prod: CartProduct, quant: number): CartProduct[] {
    const indexProduct = this.cartProducts.indexOf(prod);
    this.cartProducts[indexProduct].quantity = quant;
    this.updateCartData();
    return [...this.cartProducts];
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
