import { getStorefrontClient, isShopifyConfigured } from "./client";
import {
  adminGraphql,
  isAdminConfigured,
} from "./admin";
import { buildDirectCartUrl } from "./checkout-fallback";
import {
  PRODUCT_BY_HANDLE,
  CART_CREATE,
  CART_QUERY,
  CART_LINES_ADD,
  CART_LINES_UPDATE,
  CART_LINES_REMOVE,
} from "./queries";
import type { Cart, Product, ProductImage, ProductVariant } from "./types";

const DEFAULT_HANDLE =
  process.env.SHOPIFY_PRODUCT_HANDLE?.trim() ||
  "heated-menstrual-relief-vibration-belt";

const ADMIN_PRODUCT_BY_HANDLE = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      images(first: 8) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price
            compareAtPrice
            inventoryQuantity
          }
        }
      }
    }
  }
`;

function mapStorefrontProduct(raw: {
  id: string;
  handle: string;
  title: string;
  description: string;
  images: { edges: { node: ProductImage }[] };
  variants: { edges: { node: ProductVariant }[] };
}): Product {
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    images: raw.images.edges.map((e) => e.node),
    variants: raw.variants.edges.map((e) => e.node),
  };
}

function mapAdminProduct(raw: {
  id: string;
  handle: string;
  title: string;
  description: string;
  images: { edges: { node: { url: string; altText: string | null } }[] };
  variants: {
    edges: {
      node: {
        id: string;
        title: string;
        availableForSale?: boolean;
        price: string;
        compareAtPrice: string | null;
        inventoryQuantity?: number;
      };
    }[];
  };
}): Product {
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    description: raw.description,
    images: raw.images.edges.map((e) => ({
      url: e.node.url,
      altText: e.node.altText,
    })),
    variants: raw.variants.edges.map((e) => ({
      id: e.node.id,
      title: e.node.title,
      availableForSale: (e.node.inventoryQuantity ?? 1) > 0,
      price: { amount: e.node.price, currencyCode: "USD" },
      compareAtPrice: e.node.compareAtPrice
        ? { amount: e.node.compareAtPrice, currencyCode: "USD" }
        : null,
    })),
  };
}

function mapPublicJsonProduct(raw: {
  id: number;
  handle: string;
  title: string;
  body_html: string;
  images: { src: string; alt: string | null }[];
  variants: {
    id: number;
    title: string;
    price: string;
    compare_at_price: string | null;
    available: boolean;
  }[];
}): Product {
  return {
    id: `gid://shopify/Product/${raw.id}`,
    handle: raw.handle,
    title: raw.title,
    description: raw.body_html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
    images: raw.images.map((image) => ({
      url: image.src,
      altText: image.alt,
    })),
    variants: raw.variants.map((variant) => ({
      id: `gid://shopify/ProductVariant/${variant.id}`,
      title: variant.title,
      price: { amount: variant.price, currencyCode: "USD" },
      compareAtPrice: variant.compare_at_price
        ? { amount: variant.compare_at_price, currencyCode: "USD" }
        : null,
      // Shopify public .json omits `available`; treat missing as in stock.
      availableForSale: variant.available !== false,
    })),
  };
}

async function fetchProductFromPublicJson(handle: string): Promise<Product | null> {
  const domain =
    process.env.SHOPIFY_STORE_DOMAIN ||
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  if (!domain) return null;

  try {
    const res = await fetch(`https://${domain}/products/${handle}.json`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { product?: Parameters<typeof mapPublicJsonProduct>[0] };
    return json.product ? mapPublicJsonProduct(json.product) : null;
  } catch {
    return null;
  }
}

function mapCart(raw: {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: Cart["cost"];
  lines: { edges: { node: Cart["lines"][number] }[] };
}): Cart {
  return {
    id: raw.id,
    checkoutUrl: raw.checkoutUrl,
    totalQuantity: raw.totalQuantity,
    cost: raw.cost,
    lines: raw.lines.edges.map((e) => e.node),
  };
}

export function getMockProduct(handle: string = DEFAULT_HANDLE): Product {
  return {
    id: "gid://shopify/Product/mock",
    handle,
    title: "Heated Menstrual Relief Vibration Belt",
    description:
      "Instant heat and gentle vibration belt you can wear under your clothes. Warms in 3 seconds with 3 heat levels and 3 vibration modes.",
    images: [],
    variants: [
      {
        id: "gid://shopify/ProductVariant/mock-1",
        title: "1 Belt",
        price: { amount: "55.58", currencyCode: "USD" },
        compareAtPrice: { amount: "79.00", currencyCode: "USD" },
        availableForSale: true,
      },
      {
        id: "gid://shopify/ProductVariant/mock-2",
        title: "2 Belts",
        price: { amount: "99.00", currencyCode: "USD" },
        compareAtPrice: { amount: "111.00", currencyCode: "USD" },
        availableForSale: true,
      },
      {
        id: "gid://shopify/ProductVariant/mock-3",
        title: "3 Belts",
        price: { amount: "139.00", currencyCode: "USD" },
        compareAtPrice: { amount: "167.00", currencyCode: "USD" },
        availableForSale: true,
      },
    ],
  };
}

export async function getProduct(
  handle: string = DEFAULT_HANDLE
): Promise<Product | null> {
  if (!isShopifyConfigured) {
    const mock = getMockProduct(handle);
    return mock.handle === handle ? mock : null;
  }

  try {
    if (isAdminConfigured) {
      try {
        const data = await adminGraphql<{ productByHandle: Parameters<typeof mapAdminProduct>[0] | null }>(
          ADMIN_PRODUCT_BY_HANDLE,
          { handle }
        );
        if (data.productByHandle) {
          return mapAdminProduct(data.productByHandle);
        }
      } catch (adminError) {
        console.error("Shopify admin product fetch error:", adminError);
      }
    }

    const client = await getStorefrontClient();
    if (client) {
      const response = await client.request(PRODUCT_BY_HANDLE, { variables: { handle } });
      const product = response.data?.product;
      if (product) {
        return mapStorefrontProduct(product as Parameters<typeof mapStorefrontProduct>[0]);
      }
    }

    const publicProduct = await fetchProductFromPublicJson(handle);
    if (publicProduct) {
      return publicProduct;
    }
  } catch (error) {
    console.error("Shopify product fetch error:", error);
  }

  const mock = getMockProduct(handle);
  return mock.handle === handle ? mock : null;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const client = await getStorefrontClient();
  if (!client) return null;

  const response = await client.request(CART_QUERY, { variables: { cartId } });
  const cart = response.data?.cart;
  if (!cart) return null;
  return mapCart(cart as Parameters<typeof mapCart>[0]);
}

export async function createCart(variantId: string, quantity = 1): Promise<Cart | null> {
  const client = await getStorefrontClient();
  if (client) {
    try {
      const response = await client.request(CART_CREATE, {
        variables: { lines: [{ merchandiseId: variantId, quantity }] },
      });

      const userErrors = response.data?.cartCreate?.userErrors;
      if (userErrors?.length) {
        console.error("Shopify cartCreate userErrors:", userErrors);
      }

      const cart = response.data?.cartCreate?.cart;
      if (cart) return mapCart(cart as Parameters<typeof mapCart>[0]);
    } catch (error) {
      console.error("Storefront cartCreate error:", error);
    }
  }

  return null;
}

export function getDirectCheckoutUrl(
  variantId: string,
  quantity = 1
): string | null {
  return buildDirectCartUrl(variantId, quantity);
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<Cart | null> {
  const client = await getStorefrontClient();
  if (!client) return null;

  try {
    const response = await client.request(CART_LINES_ADD, {
      variables: { cartId, lines: [{ merchandiseId: variantId, quantity }] },
    });

    const userErrors = response.data?.cartLinesAdd?.userErrors;
    if (userErrors?.length) {
      console.error("Shopify cartLinesAdd userErrors:", userErrors);
    }

    const cart = response.data?.cartLinesAdd?.cart;
    if (cart) return mapCart(cart as Parameters<typeof mapCart>[0]);
  } catch (error) {
    console.error("Storefront cartLinesAdd error:", error);
  }

  return null;
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart | null> {
  const client = await getStorefrontClient();
  if (!client) return null;

  const response = await client.request(CART_LINES_UPDATE, {
    variables: { cartId, lines: [{ id: lineId, quantity }] },
  });

  const cart = response.data?.cartLinesUpdate?.cart;
  if (!cart) return null;
  return mapCart(cart as Parameters<typeof mapCart>[0]);
}

export async function removeFromCart(
  cartId: string,
  lineIds: string[]
): Promise<Cart | null> {
  const client = await getStorefrontClient();
  if (!client) return null;

  const response = await client.request(CART_LINES_REMOVE, {
    variables: { cartId, lineIds },
  });

  const cart = response.data?.cartLinesRemove?.cart;
  if (!cart) return null;
  return mapCart(cart as Parameters<typeof mapCart>[0]);
}

export function formatMoney(amount: string, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));
}

export { isShopifyConfigured } from "./admin";
export type { Product, Cart } from "./types";
export { DEFAULT_HANDLE };
