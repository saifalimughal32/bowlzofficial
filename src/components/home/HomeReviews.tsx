"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import {
  ratingDistribution,
  reviews,
  siteConfig,
} from "@/data/content";
import { FadeIn, LiftCard, StaggerContainer, StaggerItem } from "@/components/ui/motion";

type Props = { images?: string[] };

export function HomeReviews({ images = [] }: Props) {
  return (
    <section id="reviews" className="section section-rose">
      <div className="container-main">
        <div className="mb-14 grid gap-10 lg:grid-cols-[280px_1fr] lg:items-start">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
              Reviews
            </p>
            <h2 className="mb-4 text-[clamp(2rem,4vw,3rem)]">
              Loved by women across the USA
            </h2>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="font-heading text-5xl text-ink">{siteConfig.starRating}</span>
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                ))}
              </div>
            </div>
            <p className="mb-6 text-sm text-taupe-dark">
              Based on {siteConfig.reviewCount} verified reviews
            </p>
            <div className="space-y-2">
              {ratingDistribution.map((row) => (
                <div key={row.stars} className="flex items-center gap-3 text-sm">
                  <span className="w-3 text-taupe-dark">{row.stars}</span>
                  <div className="rating-bar flex-1">
                    <div
                      className="rating-bar-fill"
                      style={{ width: `${row.percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-right text-caption">{row.percent}%</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <StaggerContainer className="grid gap-4 sm:grid-cols-2">
            {reviews.slice(0, 4).map((review, i) => (
              <StaggerItem key={review.author}>
                <LiftCard className="h-full p-6">
                  <div className="mb-4 flex gap-1 text-gold">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="mb-5 text-sm leading-relaxed text-taupe-dark">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    {images[i] ? (
                      <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-blush">
                        <Image src={images[i]} alt="" fill className="object-cover" sizes="40px" />
                      </div>
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blush font-heading text-sm text-plum">
                        {review.author[0]}
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-semibold text-ink">{review.author}</p>
                      <p className="text-xs text-caption">
                        {review.location} · {review.date}
                      </p>
                    </div>
                  </div>
                </LiftCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
