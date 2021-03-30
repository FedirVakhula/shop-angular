import { ProductModel } from 'src/app/interface/products';

export interface ProductsState {
    data: ReadonlyArray<ProductModel>;
    readonly loading: boolean;
    readonly error: Error | string;
}

export const initialProductsState: ProductsState = {
    data: [],
    loading: false,
    error: null
};
