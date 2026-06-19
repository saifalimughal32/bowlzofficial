import { Hero } from "@/components/sections/Hero";
import { SocialProofStrip } from "@/components/sections/SocialProofStrip";
import { ProblemSection } from "@/components/sections/ProblemSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Benefits } from "@/components/sections/Benefits";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { VideoDemo } from "@/components/sections/VideoDemo";
import { FeaturedOffer } from "@/components/sections/FeaturedOffer";
import { Reviews } from "@/components/sections/Reviews";
import { Comparison } from "@/components/sections/Comparison";
import { Guarantee } from "@/components/sections/Guarantee";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { siteConfig } from "@/data/content";
import { getProduct } from "@/lib/shopify";
import { galleryUrls, pickImage } from "@/lib/product-gallery";

export default async function HomePage() {
  const product = await getProduct(siteConfig.productHandle);
  const urls = galleryUrls(product?.images ?? []);

  return (
    <>
      <Hero heroImage={pickImage(urls, 0)} />
      <SocialProofStrip />
      <ProblemSection />
      <HowItWorks />
      <Benefits benefitImages={[pickImage(urls, 1), pickImage(urls, 2), pickImage(urls, 3), pickImage(urls, 4)]} />
      <BeforeAfter />
      <VideoDemo posterImages={[pickImage(urls, 5), pickImage(urls, 6), pickImage(urls, 7)]} />
      <FeaturedOffer />
      <Reviews
        reviewImages={[
          pickImage(urls, 8),
          pickImage(urls, 9),
          pickImage(urls, 10),
          pickImage(urls, 11),
          pickImage(urls, 12),
          pickImage(urls, 13),
        ]}
      />
      <Comparison />
      <Guarantee />
      <FAQ />
      <FinalCTA />
    </>
  );
}
