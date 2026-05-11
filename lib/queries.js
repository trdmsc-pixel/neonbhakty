/** GraphQL queries for Shopify Storefront API */

export const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          vendor
          productType
          tags
          createdAt
          availableForSale
          priceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
          compareAtPriceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
          images(first: 5) {
            edges { node { url altText width height } }
          }
          variants(first: 20) {
            edges {
              node {
                id
                title
                availableForSale
                price { amount currencyCode }
                compareAtPrice { amount currencyCode }
                selectedOptions { name value }
                image { url altText }
              }
            }
          }
        }
      }
    }
  }
`;

export const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      descriptionHtml
      vendor
      productType
      tags
      createdAt
      availableForSale
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      compareAtPriceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      images(first: 10) {
        edges { node { url altText width height } }
      }
      variants(first: 30) {
        edges {
          node {
            id
            title
            availableForSale
            price { amount currencyCode }
            compareAtPrice { amount currencyCode }
            selectedOptions { name value }
            image { url altText }
          }
        }
      }
      options { name values }
    }
  }
`;

export const COLLECTIONS_QUERY = `
  query Collections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image { url altText }
          products(first: 1) {
            edges { node { id } }
          }
        }
      }
    }
  }
`;

export const COLLECTION_BY_HANDLE_QUERY = `
  query CollectionByHandle($handle: String!, $first: Int!) {
    collection(handle: $handle) {
      id
      title
      handle
      description
      image { url altText }
      products(first: $first, sortKey: BEST_SELLING) {
        edges {
          node {
            id
            title
            handle
            vendor
            tags
            createdAt
            availableForSale
            priceRange {
              minVariantPrice { amount currencyCode }
              maxVariantPrice { amount currencyCode }
            }
            compareAtPriceRange {
              minVariantPrice { amount currencyCode }
              maxVariantPrice { amount currencyCode }
            }
            images(first: 3) {
              edges { node { url altText width height } }
            }
            variants(first: 5) {
              edges {
                node {
                  id
                  title
                  availableForSale
                  price { amount currencyCode }
                }
              }
            }
          }
        }
      }
    }
  }
`;
