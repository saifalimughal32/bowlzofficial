import type { NextConfig } from "next";

const productHandle =
  process.env.SHOPIFY_PRODUCT_HANDLE?.trim() ||
  "heated-menstrual-relief-vibration-belt";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/products/period-heating-pad",
        destination: `/products/${productHandle}`,
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
      },
    ],
  },
};

export default nextConfig;
