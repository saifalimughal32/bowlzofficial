"use client";

import { useState } from "react";
import { HomeSection } from "@/components/home/HomeSection";
import { WholesaleContactForm } from "@/components/wholesale/WholesaleContactForm";
import { cn } from "@/lib/utils";

type WholesaleOption = "apply" | "account";

const OPTIONS: { id: WholesaleOption; label: string; description: string }[] = [
  {
    id: "apply",
    label: "Apply for Wholesale",
    description: "New smoke shops & dispensaries",
  },
  {
    id: "account",
    label: "Create Wholesale Account",
    description: "Get set up with our wholesale team",
  },
];

export function HomeWholesale() {
  const [selectedOption, setSelectedOption] = useState<WholesaleOption | null>(null);

  const showForm = selectedOption !== null;

  return (
    <HomeSection id="wholesale" className="bg-[#fafafa]">
      <div className="container-main">
        {!showForm ? (
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-ink md:text-3xl lg:text-[2rem]">
              Got a Smokeshop or Dispensary?
            </h2>
            <p className="mt-3 text-sm text-muted md:text-base">
              Choose an option below and our wholesale team will be in touch.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {OPTIONS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setSelectedOption(option.id)}
                  className={cn(
                    "group flex flex-col items-center rounded-2xl border border-black/[0.08] bg-white px-6 py-8 text-center shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all duration-300",
                    "hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[0_12px_32px_rgba(0,0,0,0.08)]",
                    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                  )}
                >
                  <span className="inline-flex min-h-[48px] items-center rounded-full bg-ink px-8 text-sm font-bold uppercase tracking-[0.06em] text-white transition-opacity group-hover:opacity-90">
                    {option.label}
                  </span>
                  <span className="mt-4 text-xs text-muted md:text-sm">
                    {option.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="wholesale-reveal mx-auto max-w-3xl">
            <button
              type="button"
              onClick={() => setSelectedOption(null)}
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.06em] text-muted transition-colors hover:text-ink"
            >
              <span aria-hidden>←</span> Back to options
            </button>

            <div className="rounded-2xl border border-black/[0.06] bg-white px-6 py-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:px-10 md:py-12">
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-ink md:text-3xl">
                  Wholesale Contact Form
                </h2>
                <p className="mt-2 text-sm text-muted md:text-base">
                  Enter your contact info and our wholesale team will be in touch.
                </p>
              </div>
              <WholesaleContactForm />
            </div>
          </div>
        )}
      </div>
    </HomeSection>
  );
}
