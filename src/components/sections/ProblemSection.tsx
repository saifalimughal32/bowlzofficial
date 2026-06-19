import { AnimateIn } from "@/components/ui/AnimateIn";

export function ProblemSection() {
  return (
    <section className="section section-alt" id="problem">
      <div className="container-main text-center">
        <AnimateIn>
          <h2 className="mb-6 text-[clamp(1.75rem,4vw,2.5rem)]">
            Periods shouldn&apos;t cost you your whole week.
          </h2>
          <p className="mx-auto max-w-[680px] text-[1.0625rem] leading-relaxed text-taupe-dark">
            You cancel plans. You live on pain pills and caffeine just to function.
            You&apos;re curled up with a hot water bottle that goes cold in 10 minutes and
            chains you to the couch. Every month, the same thing — your body decides, and
            you just… cope.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
