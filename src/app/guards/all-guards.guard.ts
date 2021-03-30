import { Injectable } from '@angular/core';
import {
  CanActivate,
  CanLoad,
  Route,
  UrlSegment,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
  CanActivateChild,
  CanDeactivate,
  Resolve
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { CanComponentDeactivate } from '../interface/can-component-deactivate.interface';
import { ProductModel } from '../interface/products';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';

@Injectable({
  providedIn: 'root'
})
export class AllGuards implements
  CanActivate,
  CanLoad,
  CanActivateChild,
  CanDeactivate<CanComponentDeactivate>,
  Resolve<ProductModel> {

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private productsService: ProductsService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ProductModel | null> {
    if (!route.paramMap.has('id')) {
      return of(null);
    }
    const id = route.paramMap.get('id');

    return of(this.productsService.getProduct(id))
      .pipe(
        catchError(() => {
          this.router.navigate(['/products']);
          return of(null);
        })
      );
  }

  canDeactivate(component: CanComponentDeactivate):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return component.canDeactivate ? component.canDeactivate() : true;
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.authService.isAdmin;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (route.path === 'cart') {
      return !this.cartService.isEmptyCart();
    }
    if (route.path === 'admin') {
      return this.authService.isAdmin;
    }
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLogin();
  }

  private checkLogin(): boolean | UrlTree {
    if (this.authService.isAdmin) {
      return true;
    }
    return this.router.parseUrl('/login');
  }
}
