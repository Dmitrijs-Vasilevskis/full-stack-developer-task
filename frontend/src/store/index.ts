import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { navigationReducer } from "./Navigation/Navigation.reducer";
import { categoryReducer } from './CategoryPage/Category.reducer';
import { productPageReducer } from "./ProductPage/ProductPage.reducer";
import { cartReducer } from "./Cart/Cart.reducer";

export const store = configureStore({
  reducer: {
    navigationReducer: navigationReducer,
    categoryReducer: categoryReducer,
    productReducer: productPageReducer,
    cartReducer: cartReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store
