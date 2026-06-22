import { NextResponse } from "next/server";
import { getProduct } from "@/lib/shopify";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const handle = searchParams.get("handle");
  if (!handle) {
    return NextResponse.json({ error: "handle required" }, { status: 400 });
  }

  const product = await getProduct(handle);
  const variantId = product?.variants[0]?.id;
  if (!variantId) {
    return NextResponse.json({ error: "variant not found" }, { status: 404 });
  }

  return NextResponse.json({ variantId });
}
