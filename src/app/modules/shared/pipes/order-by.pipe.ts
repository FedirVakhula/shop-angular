import { Pipe, PipeTransform } from '@angular/core';
import { CartProduct } from 'src/app/interface/products';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(product: CartProduct[], key: string[], isAsc: boolean): unknown {
    return this.customSort(product, key, isAsc);
  }

  customSort(arr: CartProduct[], fields: string[], isAsc: boolean): CartProduct[] {
    return arr.sort((a, b) => {
      // tslint:disable-next-line:prefer-for-of
      // в документе не сказано было о том, что сортировка по второму полю должна быть
      // в рамках одинаковых значений первого поля, иначе это не имет смысла.
      // но за попытку спасибо.
      for (let i = 0; i < fields.length; i++) {
        if (typeof a[fields[i]] === 'string') {
          a[fields[i]] = a[fields[i]].toLowerCase();
          b[fields[i]] = b[fields[i]].toLowerCase();
        }
        if (isAsc) {
          if (a[fields[i]] > b[fields[i]]) { return -1; }
          if ((a[fields[i]] < b[fields[i]])) { return 1; }
        } else {
          if (a[fields[i]] < b[fields[i]]) { return -1; }
          if ((a[fields[i]] > b[fields[i]])) { return 1; }
        }
      }
    });
  }

}
