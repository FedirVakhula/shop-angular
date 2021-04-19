import { DebugElement, TemplateRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Category } from 'src/app/interface/products';

import { CartItemComponent } from './cart-item.component';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;
  let productArt: DebugElement;
  let elProductArt: HTMLElement;
  let productCategory: DebugElement;
  let elProductCategory: HTMLElement;
  let productName: DebugElement;
  let elProductName: HTMLElement;
  let productModel: DebugElement;
  let elProductModel: HTMLElement;
  let productDescription: DebugElement;
  let elProductDescription: HTMLElement;
  let productColor: DebugElement;
  let elProductColor: HTMLElement;
  let productPrice: DebugElement;
  let elProductPrice: HTMLElement;
  let changeQuantity: DebugElement;
  let productQuantity: DebugElement;
  let elProductQuantity: HTMLInputElement;
  let deleteProduct: DebugElement;
  let elDeleteProduct: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    productArt = fixture.debugElement.query(By.css('.product-art'));
    elProductArt = productArt.nativeElement;
    productCategory = fixture.debugElement.query(By.css('.product-category'));
    elProductCategory = productCategory.nativeElement;
    productName = fixture.debugElement.query(By.css('.product-name'));
    elProductName = productName.nativeElement;
    productModel = fixture.debugElement.query(By.css('.product-model'));
    elProductModel = productModel.nativeElement;
    productDescription = fixture.debugElement.query(By.css('.product-description'));
    elProductDescription = productDescription.nativeElement;
    productColor = fixture.debugElement.query(By.css('.product-color'));
    elProductColor = productColor.nativeElement;
    productPrice = fixture.debugElement.query(By.css('.product-price'));
    elProductPrice = productPrice.nativeElement;
    productQuantity = fixture.debugElement.query(By.css('.product-quantity'));
    elProductQuantity = productQuantity.nativeElement as HTMLInputElement;
    changeQuantity = fixture.debugElement.query(By.css('.change-quantity'));
    elDeleteProduct = productQuantity.nativeElement as HTMLInputElement;
    deleteProduct = fixture.debugElement.query(By.css('.delete-product'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product data', () => {
    component.product = {
      category: Category.LAPTOP,
      name: 'asus',
      model: 'vivobook',
      id: 'K513EA-BQ163',
      art: 'K513EA-BQ163',
      color: 'hearty gold',
      price: 18799,
      isAvailable: true,
      description: 'lorem.....',
      quantity: 1,
      url: 'https://blog.eduonix.com/wp-content/uploads/2015/10/Angular.png'
    };

    fixture.detectChanges();
    expect(elProductArt.textContent).toContain('K513EA-BQ163');
    expect(elProductCategory.textContent).toContain('LAPTOP');
    expect(elProductName.textContent).toContain('Asus');
    expect(elProductModel.textContent).toContain('Vivobook');
    expect(elProductDescription.textContent).toContain('lorem.....');
    expect(elProductColor.textContent).toContain('Hearty Gold');
    expect(elProductPrice.textContent).toContain('₴18,799.00');
  });

  it('should raise selected event when clicked', () => {
    component.product = {
      category: Category.LAPTOP,
      name: 'asus',
      model: 'vivobook',
      id: 'K513EA-BQ163',
      art: 'K513EA-BQ163',
      color: 'hearty gold',
      price: 18799,
      isAvailable: true,
      description: 'lorem.....',
      quantity: 1,
      url: 'https://blog.eduonix.com/wp-content/uploads/2015/10/Angular.png'
    };

    fixture.detectChanges();

    elProductQuantity.value = '2';

    component.changeQuantityProduct.subscribe(({product, quant}) => {
      expect(product).toEqual(component.product);
      expect(quant).toBe(2);
    });

    changeQuantity.triggerEventHandler('click', null);
  });

  it('should delete selected product when clicked', () => {
    component.product = {
      category: Category.LAPTOP,
      name: 'asus',
      model: 'vivobook',
      id: 'K513EA-BQ163',
      art: 'K513EA-BQ163',
      color: 'hearty gold',
      price: 18799,
      isAvailable: true,
      description: 'lorem.....',
      quantity: 1,
      url: 'https://blog.eduonix.com/wp-content/uploads/2015/10/Angular.png'
    };

    fixture.detectChanges();

    component.deleteProductEmit.subscribe((product) => {
      expect(product).toEqual(component.product);
    });

    deleteProduct.triggerEventHandler('click', null);
  });
});
