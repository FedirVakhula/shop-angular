import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ProductFacadeService } from 'src/app/core/@ngrx/services/product.facade.service';

import { CartProduct, ProductModel } from 'src/app/interface/products';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list-component.component.html',
  styleUrls: ['./product-list-component.component.scss']
})
export class ProductListComponentComponent implements OnInit, AfterViewChecked {
  products$: Observable<ReadonlyArray<ProductModel>>;
  titles: Array<string>;

  @Output() buyProduct: EventEmitter<CartProduct> = new EventEmitter();

  constructor(
    private productsService: ProductsService,
    private cartService: CartService,
    private productFacadeService: ProductFacadeService,
    private changeRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.titles = this.productsService.getTableColumnTitles();
    this.products$ = this.productFacadeService.products$.pipe(
      tap((products: ProductModel[]) => {
        if (!Boolean(products.length)) {
          this.productFacadeService.getProducts();
        }
      })
    );
  }

  onBuyProduct(newValue: CartProduct): void {
    console.log('buy products');
    this.cartService.addProduct(newValue);
  }

  onDetailsProduct(product: ProductModel): void {
    const path = ['/product', product.id];
    this.productFacadeService.goNavigateTo({ path });
  }

  onEditProduct(product: ProductModel): void {
    const path = ['admin/products/edit', product.id];
    this.productFacadeService.goNavigateTo({ path });
  }

  ngAfterViewChecked(): void { this.changeRef.detectChanges(); }
}
