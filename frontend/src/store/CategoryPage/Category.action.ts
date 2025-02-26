import client from "../../services/graphql";
import { AppDispatch } from "../index";
import { fetchProducts, fetchProductsFailure, fetchProductsSuccess } from "./Category.reducer";
import { GET_CATEGORY_PAGE } from "../../graphql/query/Category.query";

export const fetchCategoryPage = (categoryId?: number) => async (dispatch: AppDispatch) => {
    dispatch(fetchProducts());

    try {
        const { data } = await client.query({
            query: GET_CATEGORY_PAGE,
            variables: {
                id: categoryId
            }
        });

        dispatch(fetchProductsSuccess(data));
    } catch (error: any) {
        dispatch(fetchProductsFailure(error));
    }

}