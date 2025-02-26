import { CartItems } from "../../store/Cart/Cart.types";
import { Product } from "../../store/ProductPage/Product.type";


export const isSameVariant = (existingItem: CartItems, newItem: CartItems) => {
    return Object.keys(existingItem.selectedAttributes).every((key) => existingItem.selectedAttributes[key] === newItem.selectedAttributes[key]);
}

export const getDefaultAttributes = (product: Product) => {
    const defaultAttributes: Record<string, string> = {};

    if (product.attributes) {
        product.attributes.forEach((attribute) => {
            defaultAttributes[attribute.attribute_code] = attribute.items[0].value;
        });
    }

    return defaultAttributes;
}

export const prepareCartItems = (cartItems: CartItems[]) => {
    return cartItems.map((cartItem: CartItems) => ({
        id: cartItem.id,
        name: cartItem.name,
        sku: cartItem.sku,
        price: cartItem.price.amount,
        currency: cartItem.price.currency,
        quantity: cartItem.qty,
        selectedAttributes: Object.entries(cartItem.selectedAttributes).map(
            ([attribute_code, value]) => ({
                attribute_code,
                value,
            }))
    }));
}