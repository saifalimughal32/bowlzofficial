"use client";

import { HomeSection } from "@/components/home/HomeSection";
import { WholesaleContactForm } from "@/components/wholesale/WholesaleContactForm";

export function HomeWholesale() {
  return (
    <HomeSection id="wholesale" tight>
      <div className="container-main">
        <div className="mx-auto max-w-3xl">
          <header className="mb-8 text-center md:mb-10">
            <h2 className="mb-3 text-2xl font-semibold tracking-[0.1em] text-ink uppercase md:text-[1.75rem]">
              Wholesale Contact Form
            </h2>
            <p className="text-sm text-muted md:text-base">
              Enter your contact info and our wholesale team will be in touch.
            </p>
          </header>
          <WholesaleContactForm />
        </div>
      </div>
    </HomeSection>
  );
}
