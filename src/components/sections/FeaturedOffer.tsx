import Link from "next/link";
import { bundles } from "@/data/content";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { PaymentIcons } from "@/components/ui/PaymentIcons";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { DEFAULT_HANDLE } from "@/lib/shopify";

export function FeaturedOffer() {
  return (
    <section className="section" id="shop">
      <div className="container-main text-center">
        <AnimateIn>
          <h2 className="mb-2 text-[clamp(1.75rem,4vw,2.5rem)]">Pick your comfort bundle</h2>
          <p className="mb-8 text-taupe-dark">
            Free USA shipping · Free travel pouch on 2+ · 30-Night Comfort Guarantee
          </p>
        </AnimateIn>
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {bundles.map((b, i) => (
            <AnimateIn key={b.qty} delay={(i + 1) as 1 | 2 | 3}>
              <div
                className={`relative rounded-[20px] bg-white p-8 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(91,42,71,0.1)] ${b.default ? "border-2 border-plum shadow-[0_8px_32px_rgba(91,42,71,0.1)]" : "border-2 border-transparent"}`}
              >
                {b.badge && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-coral px-4 py-1.5 text-[0.6875rem] font-bold uppercase text-white">
                    {b.badge}
                  </span>
                )}
                <div className="mb-2 font-heading text-xl text-plum">{b.qty} Pad{b.qty > 1 ? "s" : ""}</div>
                <div className="text-3xl font-bold">${b.price}</div>
                <div className="text-sm text-caption line-through">was ${b.compareAt}</div>
                {b.save && <div className="mt-2 text-sm font-medium text-coral">Save ${b.save}</div>}
              </div>
            </AnimateIn>
          ))}
        </div>
        <Link href={`/products/${DEFAULT_HANDLE}`} className="btn-primary btn-primary-lg">
          Add to Cart →
        </Link>
        <TrustBadges centered />
        <PaymentIcons className="mt-4" />
      </div>
    </section>
  );
}
