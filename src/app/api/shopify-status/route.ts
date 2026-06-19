import { NextResponse } from "next/server";
import {
  getStoreDomain,
  isAdminConfigured,
  isStorefrontConfigured,
  isShopifyConfigured,
} from "@/lib/shopify/admin";
import { getProduct, DEFAULT_HANDLE } from "@/lib/shopify";

export const dynamic = "force-dynamic";

export async function GET() {
  const handle =
    process.env.SHOPIFY_PRODUCT_HANDLE?.trim() || DEFAULT_HANDLE;

  const status = {
    configured: isShopifyConfigured,
    admin: isAdminConfigured,
    storefront: isStorefrontConfigured,
    storeDomain: isShopifyConfigured ? getStoreDomain() : null,
    productHandle: handle,
    product: null as null | {
      title: string;
      imageCount: number;
      variantCount: number;
      isMock: boolean;
    },
    error: null as string | null,
  };

  if (!isShopifyConfigured) {
    status.error =
      "Shopify env vars missing. Set SHOPIFY_STORE_DOMAIN + SHOPIFY_STOREFRONT_ACCESS_TOKEN on Vercel.";
    return NextResponse.json(status);
  }

  try {
    const product = await getProduct(handle);
    if (!product) {
      status.error = `No product found for handle "${handle}".`;
      return NextResponse.json(status);
    }

    const isMock = product.id.includes("/mock");
    status.product = {
      title: product.title,
      imageCount: product.images.length,
      variantCount: product.variants.length,
      isMock,
    };

    if (isMock) {
      status.error =
        `Shopify is connected but product "${handle}" was not found — showing placeholder data. Create/publish the product in Shopify Admin with this exact handle.`;
    }
  } catch (error) {
    status.error =
      error instanceof Error ? error.message : "Product fetch failed";
  }

  return NextResponse.json(status);
}
