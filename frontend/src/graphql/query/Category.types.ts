export interface CategoryPage extends Category {
    items: Product[]
}

export interface Category {
    id: number;
    name: string;
    url_key: string;
}

export interface Product {
    id: string;
    name: string;
    inStock: boolean;
    gallery: string[];
    description: string;
    category: { name: string };
    attrs: Attribute[];
    prices: Price[];
    brand: string;
}

export interface Attribute {
    id: string;
    name: string;
    type: string;
    items: AttributeItem[];
}

export interface AttributeItem {
    id: string;
    value: string;
    display_value: string;
}

export interface Price {
    amount: number;
    currency: {
        label: string;
        symbol: string;
    };
}