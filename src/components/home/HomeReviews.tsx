import { HomeSection } from "@/components/home/HomeSection";
import { homeReviews, siteConfig } from "@/data/content";
import Image from "next/image";

function Stars() {
  return (
    <span aria-label="5 out of 5 stars" className="text-brand">
      ★★★★★
    </span>
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
      <div className="absolute inset-0 bg-charcoal/80" aria-hidden />

      <div className="container-main relative">
        <h2 className="section-label mb-10 text-center text-white md:mb-14">
          Don&apos;t Take Our Word for It
        </h2>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
          {homeReviews.map((review) => (
            <li
              key={review.name}
              className="flex flex-col rounded-2xl bg-white p-5 md:p-6"
            >
              <h4 className="mb-2 text-sm font-bold uppercase tracking-wide text-ink md:text-base">
                {review.name} <Stars />
              </h4>
              <p className="mb-1 text-xs font-medium text-muted">Verified Customer</p>
              <p className="mb-5 flex-1 text-sm leading-relaxed text-ink/90 md:text-[0.9375rem]">
                {review.text}
              </p>
              <p className="text-xs text-muted md:text-sm">{review.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </HomeSection>
  );
}
