import { Component, OnInit } from '@angular/core';
import { ProductFacadeService } from 'src/app/core/@ngrx/services/product.facade.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private productFacadeService: ProductFacadeService
  ) { }

  ngOnInit(): void {
  }

  oneEditProduct(): void {
    const path = ['admin/products/edit', 1];
    this.productFacadeService.goNavigateTo({ path });
  }

}
