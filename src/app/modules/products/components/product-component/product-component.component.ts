import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { CartProduct, ProductModel } from 'src/app/interface/products';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductComponentComponent implements OnInit {

  @Input() product: ProductModel;
  @Output() buyProduct: EventEmitter<CartProduct> = new EventEmitter();
  @ViewChild('quant') fondovalor: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  onBuy(product: ProductModel, value: number): void {
    if (!product.isAvailable) {
      return;
    }
    const newProduct: CartProduct = { ...product, quantity: value };
    this.buyProduct.emit(newProduct);
  }

}
