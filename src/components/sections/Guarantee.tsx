import Link from "next/link";
import { DEFAULT_HANDLE } from "@/lib/shopify";
import { AnimateIn } from "@/components/ui/AnimateIn";

export function Guarantee() {
  return (
    <section className="section">
      <div className="container-main">
        <AnimateIn>
          <div className="relative mx-auto max-w-[720px] overflow-hidden rounded-[20px] border-2 border-rose bg-white p-10 text-center shadow-[0_8px_32px_rgba(138,44,77,0.1)] md:p-14">
            {/* Guarantee seal */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-plum/20 bg-white">
              <div className="text-center">
                <div className="text-xs font-bold uppercase tracking-widest text-plum">30-Night</div>
                <div className="font-heading text-sm text-coral">Guarantee</div>
              </div>
            </div>
            <h2 className="mb-4 text-[clamp(1.75rem,4vw,2.5rem)]">The 30-Night Comfort Guarantee</h2>
            <p className="mx-auto mb-8 max-w-[540px] text-lg leading-relaxed text-taupe-dark">
              Try Nova Triggers through a full cycle. If it doesn&apos;t bring you real comfort,
              send it back for a full refund — no awkward questions. The only risk is one more
              period without it.
            </p>
            <Link href={`/products/${DEFAULT_HANDLE}`} className="btn-primary">
              Try It Risk-Free →
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
