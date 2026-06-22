import { siteConfig } from "@/data/content";

export function TrustBadges({ centered = false }: { centered?: boolean }) {
  return (
    <div
      className={`mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[0.8125rem] text-taupe-dark ${centered ? "justify-center" : ""}`}
    >
      <span className="flex items-center gap-1">
        <span className="text-gold">★</span>
        {siteConfig.starRating}/5 ({siteConfig.reviewCount})
      </span>
      <span className="flex items-center gap-1">
        <span aria-hidden>🇺🇸</span> Ships from USA
      </span>
      <span>🔁 30-Day Warranty</span>
      <span>🔒 Secure checkout</span>
    </div>
  );
}

export function RatingChip() {
  return (
    <a
      href="#reviews"
      className="mb-4 inline-flex items-center gap-2 rounded-full border border-plum/10 bg-white px-3 py-1.5 text-sm shadow-sm transition hover:border-plum/20"
    >
      <span className="text-gold">★★★★★</span>
      <span className="font-semibold text-charcoal">{siteConfig.starRating}</span>
      <span className="text-taupe-dark">· {siteConfig.reviewCount} reviews</span>
    </a>
  );
}
