import type { Metadata } from "next";
import { HomeWholesale } from "@/components/home/HomeWholesale";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Wholesale",
  description: `Wholesale pricing and accounts for smoke shops and dispensaries carrying ${siteConfig.name}.`,
};

export default function WholesalePage() {
  return (
    <>
      <div className="bg-white pt-24 pb-6 md:pt-28 md:pb-8">
        <div className="container-main">
          <h1 className="shop-section-title">Wholesale</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">
            Partner with Bowlz for wholesale magnetic bowls and Bongz glass. Fast
            fulfillment, display-ready packaging, and dedicated support for retailers.
          </p>
        </div>
      </div>
      <HomeWholesale />
    </>
  );
}
