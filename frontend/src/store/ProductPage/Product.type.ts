export interface Product {
    id: number;
    sku: string;
    name: string;
    description: string;
    brand: string;
    inStock: boolean;
    gallery: ProductGallery;
    attributes: ProductAttribute[];
    price: [ProductPrice];
}

export interface ProductPrice {
    amount: number;
    currency: string;
    currency_symbol: string;
}

interface ProductGallery {
    images: [string];
}

export interface ProductAttribute {
    attribute_code: string;
    type: string;
    name: string;
    items: AttributeItem[];
}

export interface AttributeItem {
    product_id: number;
    value: string;
}