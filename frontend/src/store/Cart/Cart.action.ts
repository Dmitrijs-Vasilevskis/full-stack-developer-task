import { AppDispatch } from ".."
import client from "../../services/graphql";
import { placeOrder, updateCart } from './Cart.reducer';
import { PLACE_ORDER_MUTATION } from "../../graphql/mutation/Cart.mutation";
import { isSameVariant, prepareCartItems } from "../../util/Cart/CartHelper";
import { CartItems } from "./Cart.types";

export const placeOrderAction = () => async (dispatch: AppDispatch, getState: any) => {
    const cartItems = getState().cartReducer.cartItems;
    try {
        const { data } = await client.mutate({
            mutation: PLACE_ORDER_MUTATION,
            variables: {
                input: {
                    items: prepareCartItems(cartItems)
                }
            }
        });

        dispatch(placeOrder(data.placeOrder));
    } catch (error) {
        console.log(error);
    }
}

export const updateCartAction = (newItem: CartItems) => (dispatch: AppDispatch, getState: any) => {
    const cartItems = getState().cartReducer.cartItems;

    // Check if the item already exists in the cart
    const existingItem = cartItems.find((item: CartItems) => item.sku === newItem.sku);

    if (existingItem) {

        // Check if the same variant item exists
        const isSameVariat = cartItems.some((item: CartItems) => isSameVariant(item, newItem));
        if (isSameVariat) {
            const updatedCartItems = cartItems.map((item: CartItems) => {
                if (isSameVariant(item, newItem)) {
                    return {
                        ...item,
                        qty: item.qty + newItem.qty
                    }
                }

                return item;
            });

            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
            dispatch(updateCart(updatedCartItems));

            return;
        }

        localStorage.setItem("cartItems", JSON.stringify([...cartItems, newItem]));
        dispatch(updateCart([...cartItems, newItem]));


        return;

    } else {
        localStorage.setItem("cartItems", JSON.stringify([...cartItems, newItem]));
        dispatch(updateCart([...cartItems, newItem]));

        return;
    }
}
