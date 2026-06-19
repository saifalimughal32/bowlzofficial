const DEFAULT_CHECKOUT_DOMAIN = "https://checkout.novatriggers.com";

export function getCheckoutDomain(): string {
  return (
    process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN ||
    process.env.SHOPIFY_CHECKOUT_DOMAIN ||
    DEFAULT_CHECKOUT_DOMAIN
  ).replace(/\/$/, "");
}

export function variantIdToNumeric(variantId: string): string | null {
  const gidMatch = variantId.match(/ProductVariant\/(\d+)$/);
  if (gidMatch) return gidMatch[1];
  if (/^\d+$/.test(variantId)) return variantId;
  return null;
}

/** Direct Shopify cart URL — works when Storefront API cart is unavailable. */
export function buildDirectCartUrl(
  variantId: string,
  quantity: number
): string | null {
  const numericId = variantIdToNumeric(variantId);
  if (!numericId) return null;
  return `${getCheckoutDomain()}/cart/${numericId}:${quantity}`;
}
