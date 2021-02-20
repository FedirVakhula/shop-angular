import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/interface/can-component-deactivate.interface';
import { CartProduct, ProductModel } from 'src/app/interface/products';
import { CartService } from 'src/app/services/cart.service';
import { DialogService } from 'src/app/services/dialog.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, CanComponentDeactivate {

  product: ProductModel;
  originProduct: ProductModel;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router,
    private dialogService: DialogService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .subscribe((params: ParamMap) => {
        this.product = { ... this.productsService.getProduct(params.get('id')) };
        this.originProduct = { ...this.product };
      });
  }

  onBuyProduct(): void {
    const newProduct: CartProduct = { ...this.product, quantity: 1 };
    this.cartService.addProduct(newProduct);
  }

  onSaveUser(): void {
    const product = { ...this.product };

    if (product.id) {
      this.productsService.updateProducts(product);
      this.router.navigate(['/products', { id: product.id }]);
    } else {
      this.onGoBack();
    }
    this.originProduct = { ...this.product };
  }

  onGoBack(): void {
    this.router.navigate(['./../../'], { relativeTo: this.route });
  }

  canDeactivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const flags = Object.keys(this.originProduct).map(key => {
      if (this.originProduct[key] === this.product[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }
    return this.dialogService.confirm('Discard changes?');
  }
}
