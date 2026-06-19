import { reviews, ratingDistribution, siteConfig } from "@/data/content";
import { AnimateIn } from "@/components/ui/AnimateIn";
import Image from "next/image";

function RatingBars() {
  return (
    <div className="w-full max-w-[240px] space-y-2">
      {ratingDistribution.map((row) => (
        <div key={row.stars} className="flex items-center gap-2 text-sm">
          <span className="w-8 text-taupe-dark">{row.stars}★</span>
          <div className="rating-bar flex-1">
            <div
              className="rating-bar-fill"
              style={{ width: `${row.percent}%` }}
            />
          </div>
          <span className="w-8 text-right text-caption text-xs">{row.percent}%</span>
        </div>
      ))}
    </div>
  );
}

function ReviewPhoto({ src, author }: { src: string; author: string }) {
  if (src) {
    return (
      <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-rose">
        <Image src={src} alt={`Review by ${author}`} fill className="object-cover" sizes="300px" />
      </div>
    );
  }

  return (
    <div className="mb-4 flex aspect-[4/3] items-center justify-center rounded-xl bg-gradient-to-br from-rose/50 to-cream ring-1 ring-plum/5">
      <span className="text-center text-xs uppercase tracking-wider text-plum/40">
        Customer photo
        <br />
        <span className="normal-case tracking-normal">Add review image</span>
      </span>
    </div>
  );
}

export function Reviews() {
  return (
    <section className="section section-rose" id="reviews">
      <div className="container-main">
        <AnimateIn>
          <h2 className="mb-10 text-center text-[clamp(1.75rem,4vw,2.5rem)]">
            Loved by women across the USA
          </h2>
        </AnimateIn>

        <AnimateIn delay={1}>
          <div className="mb-12 flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-16">
            <div className="text-center">
              <div className="font-heading text-5xl leading-none text-plum">{siteConfig.starRating}</div>
              <div className="mt-2 text-xl text-[#F5A623]">★★★★★</div>
              <div className="mt-1 text-sm text-taupe-dark">Based on {siteConfig.reviewCount} reviews</div>
            </div>
            <RatingBars />
          </div>
        </AnimateIn>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <AnimateIn key={r.author} delay={(i % 3 + 1) as 1 | 2 | 3}>
              <article className="h-full rounded-[20px] bg-white p-5 shadow-[0_2px_8px_rgba(91,42,71,0.06)] transition hover:shadow-[0_8px_24px_rgba(91,42,71,0.08)]">
                <ReviewPhoto src={r.imageSrc} author={r.author} />
                <div className="mb-2 text-[#F5A623]">★★★★★</div>
                <p className="mb-4 text-[0.9375rem] leading-relaxed text-taupe-dark">
                  &ldquo;{r.text}&rdquo;
                </p>
                <div className="text-sm font-semibold text-plum">{r.author}, {r.location}</div>
                <div className="mt-1 flex items-center gap-2 text-xs text-caption">
                  <span>✓ Verified buyer</span>
                  <span>·</span>
                  <span>{r.date}</span>
                </div>
              </article>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
