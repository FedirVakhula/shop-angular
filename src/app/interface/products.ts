export enum Category {
    LAPTOP = 'LAPTOP',
    MONITOR = 'MONITOR'
}

export interface ProductModel {
    category: Category;
    name: string;
    model?: string;
    id: string;
    art: string;
    color: string;
    price: number;
    isAvailable: boolean;
    description: string;
    url: string;
}

export interface CartProduct extends ProductModel {
    quantity: number;
}

export interface IUser {
    name: string;
    password: string;
    role: string;
}
