import { HomeHero } from "@/components/home/HomeHero";
import { HomeMarquee } from "@/components/home/HomeMarquee";
import { HomeFeatureGrid } from "@/components/home/HomeFeatureGrid";
import { HomeShowcase } from "@/components/home/HomeShowcase";
import { HomeSpecs } from "@/components/home/HomeSpecs";
import { HomeReviews } from "@/components/home/HomeReviews";
import { HomeBundles } from "@/components/home/HomeBundles";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { HomeFinalCTA } from "@/components/home/HomeFinalCTA";
import { siteConfig } from "@/data/content";
import { getProduct } from "@/lib/shopify";
import { galleryUrls, pickImage } from "@/lib/product-gallery";

export default async function HomePage() {
  const product = await getProduct(siteConfig.productHandle);
  const urls = galleryUrls(product?.images ?? []);

  return (
    <>
      <HomeHero
        heroImage={pickImage(urls, 0)}
        secondaryImage={pickImage(urls, 1)}
      />
      <HomeMarquee />
      <HomeFeatureGrid
        images={[
          pickImage(urls, 2),
          pickImage(urls, 3),
          pickImage(urls, 4),
          pickImage(urls, 5),
          pickImage(urls, 6),
          pickImage(urls, 7),
        ]}
      />
      <HomeShowcase
        images={[
          pickImage(urls, 8),
          pickImage(urls, 9),
          pickImage(urls, 10),
        ]}
      />
      <HomeSpecs />
      <HomeReviews
        images={[
          pickImage(urls, 11),
          pickImage(urls, 12),
          pickImage(urls, 13),
          pickImage(urls, 14),
        ]}
      />
      <HomeBundles />
      <HomeFAQ />
      <HomeFinalCTA />
    </>
  );
}
