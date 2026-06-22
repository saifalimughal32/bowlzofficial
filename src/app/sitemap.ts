import { MetadataRoute } from "next";
import { bowlzProducts, bongzProducts, cleaningProducts, siteConfig } from "@/data/content";

const PRODUCTS = [...bowlzProducts, ...bongzProducts, ...cleaningProducts];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");

  const staticRoutes = [
    "",
    "/shop",
    "/shop/bowlz",
    "/shop/bongz",
    "/shop/cleaning",
    "/wholesale",
    "/contact",
    "/policies/shipping-policy",
    "/policies/refund-policy",
    "/policies/warranty-policy",
    "/policies/privacy-policy",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...PRODUCTS.map((p) => ({
      url: `${base}/products/${p.handle}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
