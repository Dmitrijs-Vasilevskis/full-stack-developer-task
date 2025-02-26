import client from "../../services/graphql";
import { AppDispatch } from "..";
import { GET_CATEGORIES } from "../../graphql/query/Category.query";
import { fetchCategories, fetchCategoriesSuccess, fetchCategoriesFailure } from "./Navigation.reducer";

export const fetchCategoriesRequest = () => async (dispatch: AppDispatch) => {
    dispatch(fetchCategories());
    try {
        const { data } = await client.query({
            query: GET_CATEGORIES,
        });

        dispatch(fetchCategoriesSuccess(data.categories));
    } catch (error: any) {
        dispatch(fetchCategoriesFailure(error.message));
    }
}