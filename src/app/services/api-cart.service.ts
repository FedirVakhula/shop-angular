import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { CartProduct, UserCart } from '../interface/products';

@Injectable({
  providedIn: 'root'
})
export class ApiCartService {
  private baseUrlCart = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  getCart(id: string): Observable<UserCart> {
    return this.http.get<UserCart>(`${this.baseUrlCart}carts/${id}`);
  }

  buyItems(id: string, items: CartProduct[]): Observable<void[]> {
    return forkJoin([
      this.http.patch<void>(`${this.baseUrlCart}carts/${id}`, {buy_items: items}),
      this.setItems(id, [])
    ]);
  }

  setItems(id: string, items: CartProduct[]): Observable<void> {
    return this.http.patch<void>(`${this.baseUrlCart}carts/${id}`, {items});
  }
}
