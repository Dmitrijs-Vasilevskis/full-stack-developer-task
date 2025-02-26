import { ProductAttribute, ProductPrice } from "../ProductPage/Product.type";

export interface CartItems {
    id: number;
    name: string;
    sku: string;
    price: ProductPrice;
    thumbnail: string;
    selectedAttributes: Record<string, string>;
    attributes: ProductAttribute[];
    qty: number;
}

export interface CartState {
    cartItems?: CartItems[];
    cartItemsCount: number;
    cartOverlayStatus: boolean;
}