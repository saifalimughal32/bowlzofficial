import Link from "next/link";
import { DEFAULT_HANDLE } from "@/lib/shopify";
import { AnimateIn } from "@/components/ui/AnimateIn";

const steps = [
  { num: 1, title: "Wrap", text: "Slim band sits gently around your waist — soft, cozy, and secure." },
  { num: 2, title: "Warm", text: "Steady, soothing heat + gentle massage in seconds. Dial in your perfect level." },
  { num: 3, title: "Go", text: "Cordless and discreet. Your day keeps going — work, errands, rest, repeat." },
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
              Nova Triggers wraps gently around your waist and delivers steady, soothing heat
              plus a gentle massage — cordless, discreet, and ready in seconds.
            </p>
          )}
        </AnimateIn>
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <AnimateIn key={s.num} delay={(i + 1) as 1 | 2 | 3}>
              <div className="rounded-[20px] bg-white p-6 shadow-[0_2px_8px_rgba(91,42,71,0.06)] md:p-8">
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
