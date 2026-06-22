import type { Metadata } from "next";
import { ShopHero } from "@/components/shop/ShopHero";
import { CollectionTrustBar } from "@/components/shop/CollectionTrustBar";
import { PromoInfoBanner } from "@/components/shop/PromoInfoBanner";
import { ShopProductSection } from "@/components/shop/ShopProductSection";
import { HomeReviews } from "@/components/home/HomeReviews";
import { HomeWholesale } from "@/components/home/HomeWholesale";
import { bowlzProducts, bongzProducts, cleaningProducts, productSections, siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: siteConfig.description,
};

export default function ShopPage() {
  const [bowlzSection, bongzSection, cleaningSection] = productSections;

  return (
    <>
      <ShopHero />
      <CollectionTrustBar />
      <ShopProductSection
        id={bowlzSection.id}
        title={bowlzSection.title}
        products={bowlzProducts}
        shopAllHref="/shop/bowlz"
        shopAllLabel={bowlzSection.shopAllLabel}
        columns={2}
        showSwatches
      />
      <ShopProductSection
        id={bongzSection.id}
        title={bongzSection.title}
        products={bongzProducts}
        shopAllHref="/shop/bongz"
        shopAllLabel={bongzSection.shopAllLabel}
        columns={2}
        layout={bongzSection.layout}
      />
      <ShopProductSection
        id={cleaningSection.id}
        title={cleaningSection.title}
        products={cleaningProducts}
        shopAllHref="/shop/cleaning"
        shopAllLabel={cleaningSection.shopAllLabel}
        columns={2}
      />
      <PromoInfoBanner />
      <HomeReviews />
      <HomeWholesale />
    </>
  );
}
