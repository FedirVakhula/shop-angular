export enum Category {
    LAPTOP = 'LAPTOP',
    MONITOR = 'MONITOR'
}

export interface ProductModel {
    category: Category;
    name: string;
    model?: string;
    id: string;
    color: string;
    price: number;
    isAvailable: boolean;
    description: string;
}
