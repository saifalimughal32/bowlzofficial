"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { productPolicies } from "@/data/content";
import { cn } from "@/lib/utils";

export function ProductPolicies() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="border-t border-black/8 bg-white py-10 md:py-14">
      <div className="container-main max-w-3xl">
        <div className="divide-y divide-black/8 rounded-xl border border-black/8 bg-white">
          {productPolicies.map((policy, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={policy.title}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.06em] text-ink md:text-base">
                    {policy.title}
                  </span>
                  <ChevronDown
                    size={18}
                    className={cn(
                      "shrink-0 text-muted transition-transform duration-200",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm leading-relaxed whitespace-pre-line text-muted md:px-6 md:pb-6">
                    {policy.body}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
