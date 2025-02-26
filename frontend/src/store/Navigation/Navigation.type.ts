export interface CategoryInterface {
    id: number;
    name: string;
    url_key: string;
}

export interface NavigationState {
    categories: CategoryInterface[];
    activeCategory?: CategoryInterface;
    loading: boolean;
    error: string | null;
}