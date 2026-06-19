import Link from "next/link";
import { TrustBadges, RatingChip } from "@/components/ui/TrustBadges";
import { PaymentIcons } from "@/components/ui/PaymentIcons";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { siteConfig } from "@/data/content";
import { DEFAULT_HANDLE } from "@/lib/shopify";

export function Hero() {
  return (
    <section className="section overflow-hidden pb-12 pt-8 md:pb-20 md:pt-12">
      <div className="container-main">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <AnimateIn>
            <div className="max-w-[540px]">
              <RatingChip />
              <h1 className="mb-4 text-[clamp(2rem,5vw,3.25rem)] leading-tight">
                Period cramps don&apos;t get to run your day anymore.
              </h1>
              <p className="mb-6 text-lg leading-relaxed text-taupe-dark">
                A heated menstrual relief belt that warms in 3 seconds — with 3 heat levels
                and 3 vibration modes you can wear discreetly under your clothes, from bed
                to desk to everywhere else.
              </p>
              <Link href={`/products/${DEFAULT_HANDLE}`} className="btn-primary btn-primary-lg">
                Get Soothing Relief →
              </Link>
              <p className="mt-3 text-sm text-taupe-dark">
                🇺🇸 Ships from USA · Free shipping over ${siteConfig.freeShippingThreshold} · 30-night guarantee
              </p>
              <TrustBadges />
              <div className="mt-6">
                <PaymentIcons />
              </div>
            </div>
          </AnimateIn>
          <AnimateIn delay={2}>
            <ImageSlot
              src=""
              alt="Nova Triggers heated menstrual relief vibration belt — woman wearing belt at home"
              label="Hero lifestyle photo"
              hint="Warm natural light · product visible · cozy setting"
              aspect="portrait"
              priority
            />
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
