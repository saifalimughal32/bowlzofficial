import type { ProductImage } from "./shopify/types";

/** Map Shopify product images to homepage sections. */
export function galleryUrls(images: ProductImage[]): string[] {
  return images.map((img) => img.url).filter(Boolean);
}

export function pickImage(urls: string[], index: number): string {
  return urls[index % urls.length] ?? "";
}
