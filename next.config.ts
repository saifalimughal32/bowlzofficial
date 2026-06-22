import type { NextConfig } from "next";

const productHandle =
  process.env.SHOPIFY_PRODUCT_HANDLE?.trim() || "bowlz-v2";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/products/heated-menstrual-relief-vibration-belt",
        destination: `/products/${productHandle}`,
        permanent: true,
      },
      {
        source: "/products/classic-ceramic-bowl",
        destination: `/products/${productHandle}`,
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.shopify.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
