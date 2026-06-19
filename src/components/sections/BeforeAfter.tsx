import { AnimateIn } from "@/components/ui/AnimateIn";

const withoutItems = [
  "Curled up, plans canceled",
  "Hot water bottle that won't stay warm",
  "Counting hours till the next pill",
  "\"I'll just push through it\"",
];

const withItems = [
  "Warm, comfortable, upright",
  "Instant heat + gentle vibration",
  "Up to 2 hours per USB charge",
  "\"I barely noticed it was day one\"",
];

export function BeforeAfter() {
  return (
    <section className="section">
      <div className="container-main">
        <AnimateIn>
          <h2 className="mb-10 text-center text-[clamp(1.75rem,4vw,2.5rem)]">
            Your period, two ways.
          </h2>
        </AnimateIn>
        <div className="grid gap-6 md:grid-cols-2">
          <AnimateIn delay={1}>
            <div className="rounded-[20px] border border-taupe/30 bg-taupe/10 p-8">
              <div className="mb-4 font-heading text-sm uppercase tracking-widest text-taupe-dark">
                Without Nova Triggers
              </div>
              <ul className="space-y-2">
                {withoutItems.map((item) => (
                  <li key={item} className="relative pl-6 text-[0.9375rem] text-taupe-dark before:absolute before:left-0 before:top-2.5 before:h-2 before:w-2 before:rounded-full before:bg-taupe">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
          <AnimateIn delay={2}>
            <div className="rounded-[20px] border-2 border-rose bg-white p-8 shadow-[0_8px_32px_rgba(138,44,77,0.1)]">
              <div className="mb-4 font-heading text-sm uppercase tracking-widest text-coral">
                With Nova Triggers
              </div>
              <ul className="space-y-2">
                {withItems.map((item) => (
                  <li key={item} className="relative pl-6 text-[0.9375rem] text-taupe-dark before:absolute before:left-0 before:top-2.5 before:h-2 before:w-2 before:rounded-full before:bg-coral">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  );
}
