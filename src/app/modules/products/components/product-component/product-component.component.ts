import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CartProduct, ProductModel } from 'src/app/interface/products';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponentComponent implements OnInit {

  @Input() product: ProductModel;
  @Output() buyProduct: EventEmitter<CartProduct> = new EventEmitter();
  @Output() productId: EventEmitter<ProductModel> = new EventEmitter();
  @Output() productIdEdit: EventEmitter<ProductModel> = new EventEmitter();

  get isAdmin(): boolean {
    return this.authService.isAdmin;
  }

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onBuy(product: ProductModel, value: number): void {
    if (!product.isAvailable) {
      return;
    }
    const newProduct: CartProduct = { ...product, quantity: +value };
    this.buyProduct.emit(newProduct);
  }

  onDetailsProduct(productId: ProductModel): void {
    this.productId.emit(productId);
  }

  onEditProduct(productId: ProductModel): void {
    this.productIdEdit.emit(productId);
  }

}
