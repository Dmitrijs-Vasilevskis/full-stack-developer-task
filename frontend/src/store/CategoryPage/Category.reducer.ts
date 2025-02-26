import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryPageResponse, CategoryPageState } from './Category.type';


const initialState: CategoryPageState = {
    loading: false,
    error: null,
    items: undefined,
};

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        fetchProducts: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchProductsSuccess: (state, action: PayloadAction<CategoryPageResponse>) => {
            state.items = action.payload;
            state.loading = false;
        },
        fetchProductsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        }
    },
});

export const { fetchProducts, fetchProductsSuccess, fetchProductsFailure } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
