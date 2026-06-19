import { createStorefrontApiClient } from "@shopify/storefront-api-client";
import {
  getStoreDomain,
  resolveStorefrontToken,
} from "./admin";

export { isShopifyConfigured } from "./admin";

export async function getStorefrontClient() {
  const token = await resolveStorefrontToken();
  if (!token) return null;

  return createStorefrontApiClient({
    storeDomain: getStoreDomain(),
    apiVersion: "2025-01",
    publicAccessToken: token,
  });
}
