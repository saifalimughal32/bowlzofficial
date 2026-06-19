import { NextResponse } from "next/server";
import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCartLine,
  isShopifyConfigured,
} from "@/lib/shopify";

export async function POST(request: Request) {
  if (!isShopifyConfigured) {
    return NextResponse.json(
      {
        error:
          "Shopify is not configured. Add SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN (or SHOPIFY_ADMIN_ACCESS_TOKEN) in Vercel env settings.",
        cart: null,
      },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const { action, cartId, variantId, quantity = 1, lineId, lineIds } = body;

    let cart = null;

    switch (action) {
      case "get":
        cart = await getCart(cartId);
        break;
      case "create":
        cart = await createCart(variantId, quantity);
        break;
      case "add":
        cart = await addToCart(cartId, variantId, quantity);
        break;
      case "update":
        cart = await updateCartLine(cartId, lineId, quantity);
        break;
      case "remove":
        cart = await removeFromCart(cartId, lineIds);
        break;
      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    return NextResponse.json({ cart });
  } catch (error) {
    console.error("Cart API error:", error);
    return NextResponse.json({ error: "Cart operation failed" }, { status: 500 });
  }
}
