"use client";

import { productSpecs } from "@/data/content";
import { FadeIn } from "@/components/ui/motion";

export function HomeSpecs() {
  return (
    <section className="section">
      <div className="container-main">
        <FadeIn className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
              Specs
            </p>
            <h2 className="text-[clamp(2rem,4vw,3rem)]">Built to perform</h2>
          </div>
          <p className="max-w-sm text-taupe-dark">
            Everything you need to know — clear, honest, no fine print.
          </p>
        </FadeIn>

        <FadeIn>
          <div className="overflow-hidden rounded-3xl border border-plum/10 bg-surface shadow-[0_8px_40px_rgba(138,44,77,0.06)]">
            {productSpecs.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex flex-col justify-between gap-2 px-6 py-5 sm:flex-row sm:items-center sm:px-8 ${
                  i !== productSpecs.length - 1 ? "border-b border-plum/8" : ""
                }`}
              >
                <span className="text-sm font-medium uppercase tracking-wider text-taupe">
                  {spec.label}
                </span>
                <span className="font-medium text-ink">{spec.value}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
