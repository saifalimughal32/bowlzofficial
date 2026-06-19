import { siteConfig } from "@/data/content";

const items = [
  `${siteConfig.customerCount} happy customers`,
  `${siteConfig.starRating} average rating`,
  "Ships from California",
  "30-night comfort guarantee",
  "Free shipping over $49",
  "USB rechargeable · 2 hr battery",
];

export function HomeMarquee() {
  const doubled = [...items, ...items];

  return (
    <section className="overflow-hidden border-y border-plum/10 bg-surface py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="mx-8 flex items-center gap-8 text-sm font-medium text-taupe-dark">
            {item}
            <span className="text-coral">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
