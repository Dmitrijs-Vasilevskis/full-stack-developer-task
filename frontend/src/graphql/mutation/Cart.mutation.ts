import { gql } from "@apollo/client";

export const PLACE_ORDER_MUTATION = gql`
  mutation PlaceOrder($input: PlaceOrderInput!) {
    placeOrder(input: $input) {
        status
        message
    }
  }
`;