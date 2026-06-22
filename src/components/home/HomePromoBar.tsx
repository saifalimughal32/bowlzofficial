import { siteConfig } from "@/data/content";

export function HomePromoBar() {
  return (
    <div className="bg-brand px-4 py-2.5 text-center text-white">
      <p className="text-[0.6875rem] font-semibold uppercase leading-snug tracking-wide sm:text-xs md:text-sm">
        {siteConfig.promo}
      </p>
    </div>
  );
}
