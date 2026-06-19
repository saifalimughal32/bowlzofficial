import Link from "next/link";
import { DEFAULT_HANDLE } from "@/lib/shopify";
import { AnimateIn } from "@/components/ui/AnimateIn";

const steps = [
  { num: 1, title: "Wrap", text: "Adjustable belt fits up to 50\" — soft, skin-friendly strap sits gently around your waist." },
  { num: 2, title: "Warm", text: "Heats in 3 seconds. Choose from 3 heat levels and 3 vibration modes for your perfect comfort." },
  { num: 3, title: "Go", text: "USB rechargeable for up to 2 hours. Discreet under clothes — your day keeps going." },
];

type Props = { compact?: boolean };

export function HowItWorks({ compact = false }: Props) {
  return (
    <section className={compact ? "section-alt section !py-12 md:!py-16" : "section"} id="how-it-works">
      <div className="container-main text-center">
        <AnimateIn>
          <h2 className="mb-4 text-[clamp(1.75rem,4vw,2.5rem)]">What if warmth just came with you?</h2>
          {!compact && (
            <p className="mx-auto mb-10 max-w-[680px] text-taupe-dark">
              Nova Triggers wraps gently around your waist and delivers instant heat plus
              gentle vibration — USB rechargeable, adjustable, and ready in 3 seconds.
            </p>
          )}
        </AnimateIn>
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <AnimateIn key={s.num} delay={(i + 1) as 1 | 2 | 3}>
              <div className="rounded-[20px] bg-white p-6 shadow-[0_2px_8px_rgba(138,44,77,0.06)] md:p-8">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose font-heading text-xl text-plum">
                  {s.num}
                </div>
                <h3 className="mb-2 font-heading text-xl">{s.title}</h3>
                <p className="text-sm text-taupe-dark">{s.text}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
        {!compact && (
          <div className="mt-10">
            <Link href={`/products/${DEFAULT_HANDLE}`} className="btn-primary">
              Shop Now →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
