import { GET_PRODUCT } from "../../graphql/query/Product.query";
import client from "../../services/graphql";
import { AppDispatch } from "../index";
import { fetchProductStart, fetchProductSuccess, fetchProductFailure } from "./ProductPage.reducer";

export const fetchProductPage = (sku: string) => async (dispatch: AppDispatch) => {
    dispatch(fetchProductStart());

    try {
        const { data } = await client.query({
            query: GET_PRODUCT,
            variables: { sku },
        });

        dispatch(fetchProductSuccess(data.product));
    } catch (error: any) {
        dispatch(fetchProductFailure(error.message));
    }
};
