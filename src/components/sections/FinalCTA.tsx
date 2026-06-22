import Link from "next/link";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { DEFAULT_HANDLE } from "@/lib/shopify";

export function FinalCTA() {
  return (
    <section className="bg-white py-20 text-center md:py-24">
      <div className="container-main">
        <AnimateIn>
          <h2 className="mb-4 text-[clamp(1.75rem,4vw,2.5rem)]">Take back your week.</h2>
          <p className="mx-auto mb-8 max-w-md text-taupe-dark">
            Your next period can feel different. Instant heat and gentle vibration that goes wherever you do.
          </p>
          <Link href={`/products/${DEFAULT_HANDLE}`} className="btn-primary btn-primary-lg">
            Get Soothing Relief →
          </Link>
          <TrustBadges centered />
        </AnimateIn>
      </div>
    </section>
  );
}
