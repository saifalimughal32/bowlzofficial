"use client";

import { HomeSection } from "@/components/home/HomeSection";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { homeReviews, siteConfig } from "@/data/content";
import { Star } from "lucide-react";
import Image from "next/image";

function StarRating() {
  return (
    <span className="inline-flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="h-3.5 w-3.5 fill-brand text-brand md:h-4 md:w-4"
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

function ReviewCard({
  name,
  text,
  location,
  product,
}: {
  name: string;
  text: string;
  location: string;
  product?: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-white p-5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] md:p-6">
      <div className="mb-2 flex items-start justify-between gap-3">
        <h3 className="text-sm font-bold uppercase tracking-wide text-ink md:text-base">
          {name}
        </h3>
        <StarRating />
      </div>
      <p className="mb-3 text-[0.6875rem] font-medium uppercase tracking-[0.06em] text-muted">
        Verified Customer
      </p>
      <p className="mb-5 flex-1 text-sm leading-relaxed text-ink/90 md:text-[0.9375rem]">
        {text}
      </p>
      <div className="mt-auto space-y-1 border-t border-black/[0.06] pt-4">
        {product ? (
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-brand">
            {product}
          </p>
        ) : null}
        <p className="text-xs text-muted md:text-sm">{location}</p>
      </div>
    </article>
  );
}

export function HomeReviews() {
  return (
    <HomeSection id="reviews" className="relative overflow-hidden !bg-charcoal !py-16 md:!py-24">
      <Image
        src={siteConfig.reviewsBackground}
        alt=""
        fill
        className="object-cover opacity-40"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-charcoal/85" aria-hidden />

      <div className="container-main relative">
        <div className="mb-10 text-center md:mb-12">
          <h2 className="section-label text-white">Don&apos;t Take Our Word for It</h2>

          <div className="mx-auto mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/90">
            <p className="text-sm md:text-base">
              <span className="font-bold tabular-nums text-white">
                <AnimatedCounter
                  end={siteConfig.customerCountValue}
                  suffix="+"
                  className="tabular-nums"
                />
              </span>{" "}
              <span className="text-white/75">customers</span>
            </p>
            <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden />
            <p className="text-sm md:text-base">
              <span className="font-bold text-white">{siteConfig.starRating}</span>
              <span className="text-white/75"> average rating</span>
            </p>
            <span className="hidden h-4 w-px bg-white/25 sm:block" aria-hidden />
            <p className="text-sm md:text-base">
              <span className="font-bold text-white">{siteConfig.reviewCount}</span>
              <span className="text-white/75"> verified reviews</span>
            </p>
          </div>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {homeReviews.map((review) => (
            <li key={review.name} className="min-h-0">
              <ReviewCard {...review} />
            </li>
          ))}
        </ul>
      </div>
    </HomeSection>
  );
}
