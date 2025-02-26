import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from './Product.type';

interface ProductState {
    product: Product | null;
    error: string | null;
    loading: boolean;
}

const initialState: ProductState = {
    product: null,
    error: null,
    loading: false,
};

const productPageSlice = createSlice({
    name: 'productPage',
    initialState,
    reducers: {
        fetchProductStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchProductSuccess(state, action: PayloadAction<Product>) {
            state.loading = false;
            state.product = action.payload;
        },
        fetchProductFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { fetchProductStart, fetchProductSuccess, fetchProductFailure } = productPageSlice.actions;
export const productPageReducer = productPageSlice.reducer;