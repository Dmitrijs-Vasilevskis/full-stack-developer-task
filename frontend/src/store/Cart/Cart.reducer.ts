import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItems, CartState } from "./Cart.types";

const loadCartFromStorage = (): CartItems[] => {
    return localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")!) : [];
};


const getCartItemsTotalCount = (): number => {
    const cartItems = loadCartFromStorage();

    return cartItems.reduce((total, item) => total + item.qty, 0);
}

const initialState: CartState = {
    cartItems: loadCartFromStorage(),
    cartItemsCount: getCartItemsTotalCount(),
    cartOverlayStatus: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateCart(state, action: PayloadAction<CartItems[]>) {
            state.cartItems = action.payload;
            state.cartItemsCount = getCartItemsTotalCount();
        },
        deleteFromCart(state, action: PayloadAction<any>) {
            state.cartItems = action.payload;
        },
        placeOrder(state, action: PayloadAction<any>) {
            const { status } = action.payload;
            if (!!status) {
                state.cartItems = [];
                localStorage.removeItem("cartItems");
                state.cartItemsCount = 0;
            }
        },
        clearCart(state) {
            state.cartItems = [];
        },
        toggleCartOverlay(state) {
            state.cartOverlayStatus = !state.cartOverlayStatus;
        },
        updateCartItemQty(state, action: PayloadAction<any>) {
            const { index, value } = action.payload;

            if (state.cartItems) {
                const newQty = state.cartItems[index].qty + value;
                if (newQty > 0) {
                    state.cartItems[index].qty = newQty;
                } else {
                    state.cartItems.splice(index, 1);
                }
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            }
            state.cartItemsCount = getCartItemsTotalCount();
        },
    },
});

export const { updateCart, deleteFromCart, placeOrder, clearCart, toggleCartOverlay, updateCartItemQty } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
