"use client";

import { useState } from "react";
import { faqs } from "@/data/content";
import { AnimateIn } from "@/components/ui/AnimateIn";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section section-alt" id="faq">
      <div className="container-main">
        <AnimateIn>
          <h2 className="mb-8 text-center text-[clamp(1.75rem,4vw,2.5rem)]">
            Questions? We&apos;ve got you.
          </h2>
        </AnimateIn>
        <div className="mx-auto max-w-[720px]">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="border-b border-plum/10">
              <button
                type="button"
                className="flex w-full items-center justify-between py-5 text-left font-semibold text-plum transition hover:text-plum/80"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {faq.q}
                <span
                  className={`ml-4 text-xl transition-transform duration-200 ${openIndex === i ? "rotate-45" : ""}`}
                >
                  +
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-48 pb-5" : "max-h-0"}`}
              >
                <p className="text-[0.9375rem] leading-relaxed text-taupe-dark">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
