import { TestBed } from '@angular/core/testing';
import { CartProduct, Category } from '../interface/products';

import { CartService } from './cart.service';

describe('CartServiceService', () => {
  let service: CartService;
  const products: CartProduct[] = [{
    category: Category.LAPTOP,
    name: 'asus',
    model: 'vivobook',
    id: 'K513EA-BQ163',
    art: 'K513EA-BQ163',
    color: 'hearty gold',
    price: 18799,
    isAvailable: true,
    description: 'lorem.....',
    url: 'https://blog.eduonix.com/wp-content/uploads/2015/10/Angular.png',
    quantity: 1
  }];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorage.setItem('CartProduct', JSON.stringify(products));
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should init data', () => {
    expect(service.cartProducts).toEqual(products);
    expect(service.totalQuantity).toBe(1);
    expect(service.totalSum).toBe(18799);
  });

  it('should add new product', () => {
    const newProduct: CartProduct = {
      category: Category.MONITOR,
      name: 'Dell',
      model: 'Dell',
      id: 'SE2216H',
      art: 'SE2216H',
      color: 'Silver',
      price: 2777,
      isAvailable: true,
      description: 'lorem.....',
      url: 'https://i.pinimg.com/originals/10/11/ce/1011cea7ce9c1c14b0ee71b722d126f4.jpg',
      quantity: 1
    };
    const result = [...service.cartProducts, newProduct];
    expect(service.totalQuantity).toBe(1);
    expect(service.totalSum).toBe(18799);

    service.addProduct(newProduct);

    expect(service.cartProducts).toEqual(result);
    expect(service.totalQuantity).toBe(2);
    expect(service.totalSum).toBe(21576);
  });

  it('should add quantity product', () => {
    expect(service.totalQuantity).toBe(1);
    expect(service.totalSum).toBe(18799);

    service.addProduct(products[0]);

    expect(service.cartProducts[0].quantity).toBe(2);
    expect(service.totalQuantity).toBe(2);
    expect(service.totalSum).toBe(37598);
  });

  it('should remove product', () => {
    expect(service.totalQuantity).toBe(1);
    expect(service.totalSum).toBe(18799);

    expect(service.removeProduct(service.cartProducts[0])).toEqual([]);

    expect(service.cartProducts.length).toBe(0);
    expect(service.totalQuantity).toBe(0);
    expect(service.totalSum).toBe(0);
  });

  it('should remove all products', () => {
    expect(service.totalQuantity).toBe(1);
    expect(service.totalSum).toBe(18799);

    expect(service.removeAllProducts()).toEqual([]);

    expect(service.cartProducts.length).toBe(0);
    expect(service.totalQuantity).toBe(0);
    expect(service.totalSum).toBe(0);
  });

  it('should add quantity product', () => {
    expect(service.totalQuantity).toBe(1);
    expect(service.totalSum).toBe(18799);

    service.changeQuantityProduct(service.cartProducts[0], 5);

    expect(service.cartProducts[0].quantity).toBe(5);
    expect(service.totalQuantity).toBe(5);
    expect(service.totalSum).toBe(93995);
  });

  it('should chack cart products is not empty', () => {
    expect(service.isEmptyCart()).toBeFalse();
  });
});
