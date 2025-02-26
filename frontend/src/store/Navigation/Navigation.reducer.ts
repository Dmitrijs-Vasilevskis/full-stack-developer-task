import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryInterface, NavigationState } from './Navigation.type';

const initialState: NavigationState = {
  categories: [],
  activeCategory: undefined,
  loading: false,
  error: null,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    fetchCategories: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchCategoriesSuccess: (state, action: PayloadAction<CategoryInterface[]>) => {
      state.categories = action.payload;
      state.loading = false;
    },
    fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<CategoryInterface>) => {
      state.activeCategory = action.payload;
    }
  },
});

export const { fetchCategories, fetchCategoriesSuccess, fetchCategoriesFailure, setActiveCategory } = navigationSlice.actions;
export const navigationReducer = navigationSlice.reducer;