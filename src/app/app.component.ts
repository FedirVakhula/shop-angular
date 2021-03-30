import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductFacadeService } from './core/@ngrx/services/product.facade.service';
import { AppSettingsService } from './core/services/app-settings.service';

import { CartProduct } from './interface/products';
import { ProductsModule } from './modules/products/products.module';
import { ApiCartService } from './services/api-cart.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  newProduct: CartProduct;
  orderList: ProductsModule[];
  isLoading$: Observable<boolean>;

  @ViewChild('appTitle') appTitle: ElementRef;

  constructor(
    private cartService: CartService,
    private apiCartService: ApiCartService,
    private appSettingsService: AppSettingsService,
    private productFacadeService: ProductFacadeService,
  ) { }

  @HostListener('window:unload', ['$event'])
  unloadHandler(): void {
    const value = JSON.parse(localStorage.getItem('CartProduct'));

    this.apiCartService.setItems(this.cartService.cartId, value).subscribe(() => this.cartService.cartProducts = []);
  }

  ngAfterViewInit(): void {
    this.appTitle.nativeElement.innerText = 'Title';
  }

  ngOnInit(): void {
    this.orderList = this.cartService.cartProducts;
    this.isLoading$ = this.productFacadeService.isLoading$;
    this.appSettingsService.getAppSetting().subscribe((settings) => this.appSettingsService.setAppSetting(settings));
  }

  onBuyProduct(value: CartProduct): void {
    this.newProduct = value;
  }
}
