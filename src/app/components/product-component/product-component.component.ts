import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductModel } from 'src/app/interface/products';

@Component({
  selector: 'app-product-component',
  templateUrl: './product-component.component.html',
  styleUrls: ['./product-component.component.scss']
})
export class ProductComponentComponent implements OnInit {

  @Input() product: ProductModel;
  @Output() buyProduct: EventEmitter<ProductModel> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onBuy(): void {
    this.buyProduct.emit(this.product);
  }

}
