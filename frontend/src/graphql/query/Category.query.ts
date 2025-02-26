
import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
    query GetCategories {
        categories {
            id
            name
            url_key
        }
    }
`;

export const GET_CATEGORY = gql`
    query GetCategory($id: ID!) {
        category(id: $id) {
            id
            name
            url_key
        }
    }
`;

export const GET_CATEGORY_PAGE = gql`
  query GetCategoryPage($id: ID) {
    category(id: $id) {
      id
      name
      url_key
      products {
        id
        name
        sku
        inStock
        description
        brand
        gallery {
          images 
        }
        attributes {
          name
          attribute_code
          type
          items {
            product_id
            value
          }
        }
        price {
          amount
          currency
          currency_symbol
        }
      }
    }
  }
`;