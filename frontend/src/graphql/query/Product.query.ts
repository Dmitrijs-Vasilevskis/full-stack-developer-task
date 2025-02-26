import { gql } from "@apollo/client";

export const GET_PRODUCT = gql`
  query GetProduct($sku: String!) {
    product(sku: $sku) {
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
          attribute_code
          type
          name
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
`;