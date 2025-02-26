import { Product } from "../ProductPage/Product.type";

export interface CategoryPageState {
    items?: CategoryPageResponse; // Updated to match API structure
    loading: boolean;
    error: string | null;
}

export interface CategoryPageResponse {
    category: CategoryDetails;
}

export interface CategoryDetails {
    id: number;
    name: string;
    url_key: string;
    products: Product[];
}