import { gql } from "@apollo/client";
export const ADD_TO_CART = gql`
  # Increments a back-end counter and gets its resulting value
  mutation Cart(
    $userId: Int
    $productId: Int
    $quantity: Int
    $shopId: Int
    $delete: Boolean
    $update: Boolean
  ) {
    Cart(
      userId: $userId
      productId: $productId
      quantity: $quantity
      shopId: $shopId
      Delete: $delete
      Update: $update
    ) {
      id
      productId
      quantity
      shopId
      userId
    }
  }
`;
export const ADD_QUANTITY = gql`
  mutation Cart(
    $userId: Int
    $productId: Int
    $quantity: Int
    $shopId: Int
    $update: Boolean
  ) {
    Cart(
      userId: $userId
      productId: $productId
      quantity: $quantity
      shopId: $shopId
      Update: $update
    ) {
      id
      productId
      quantity
      shopId
      userId
    }
  }
`;

export const DELETE_Item = gql`
mutation Mutation(
  $delete: Boolean
  $productId: Int
  $userId: Int
  $shopId: Int
) {
  Cart(
    Delete: $delete
    productId: $productId
    userId: $userId
    shopId: $shopId
  ) {
    productId
    userId
    shopId
  }
}
`;

export const ADD_TO_WHISHLIST = gql `
mutation Mutation($userId: Int, $productId: Int, $shopId: Int, $delete: Boolean) {
  Wishlist(userId: $userId, productId: $productId, shopId: $shopId, Delete: $delete) {
    id
    productId
    shopId
    userId
  }
}
`;
export const DELETE_WISH_LIST =gql`
mutation Mutation($userId: Int, $productId: Int, $shopId: Int, $delete: Boolean) {
  Wishlist(userId: $userId, productId: $productId, shopId: $shopId, Delete: $delete) {
    id
    productId
    shopId
    userId
  
  }
}
`