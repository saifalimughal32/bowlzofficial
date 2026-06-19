import { siteConfig } from "@/data/content";
import { AnimateIn } from "@/components/ui/AnimateIn";

export function SocialProofStrip() {
  return (
    <section className="border-y border-plum/10 bg-white py-5 text-center">
      <div className="container-main">
        <AnimateIn>
          <p className="text-[0.9375rem] text-taupe-dark">
            <span className="mr-2 text-[#F5A623]">★★★★★</span>
            Trusted by <span className="font-semibold text-plum">{siteConfig.customerCount}</span> women across the USA
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
