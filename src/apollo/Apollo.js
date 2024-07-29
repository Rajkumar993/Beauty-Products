import { gql } from "@apollo/client";


export const SHOP_DETAILS=gql`
query Banners($filter: bannerFilterInput) {
  banners(filter: $filter) {
    image
  }
}

`

export const GET_PRODUCTS = gql`
query Products($filter: productfilter) {
  products(filter: $filter) {
    id
    name
    prize
    featureImage
    category
    description
    isAddedToCart {
      inCart
    }
  }
}
`;

export const GET_CART = gql`
  query Cart($filter: CartFilter1) {
    cart(filter: $filter) {
      name
      id
      productId
      quantity
      featureImage
      prize
      Discount
    }
  }
`;
export  const GET_WHISHLIST =gql `
query Query($filter: WishlistFilterInput) {
wishlist(filter: $filter) {
 featureImage
 title
 productId
 prize
}
}
`
;
export const GET_BLOGS=gql`
query Query($filter: blogFilter) {
  Blog(filter: $filter) {
    image
    description
    timestamp
    title
    productName
  }
}`