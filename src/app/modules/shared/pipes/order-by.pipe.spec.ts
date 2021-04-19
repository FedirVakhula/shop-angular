import { CartProduct, Category } from 'src/app/interface/products';
import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;
  const products: CartProduct[] = [{
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
  }, {
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
    pipe = new OrderByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort product in ascending order', () => {
    const espectResult: CartProduct[] = [products[0], products[1]];
    const sort = pipe.transform(products, ['name'], true);
    expect(sort).toEqual(espectResult);
  });

  it('should sort product in descending order', () => {
    const oldResult: CartProduct[] = [products[0], products[1]];
    const espectResult: CartProduct[] = [products[1], products[0]];
    const sort = pipe.transform(oldResult, ['name'], false);
    expect(sort).toEqual(espectResult);
  });
});
