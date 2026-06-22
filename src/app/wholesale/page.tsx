import type { Metadata } from "next";
import { WholesaleContactForm } from "@/components/wholesale/WholesaleContactForm";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Wholesale",
  description: `Wholesale pricing and accounts for smoke shops and dispensaries carrying ${siteConfig.name}.`,
};

export default function WholesalePage() {
  return (
    <div className="bg-white pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="container-main">
        <div className="mx-auto max-w-3xl">
          <header className="mb-10 text-center md:mb-12">
            <h1 className="mb-3 text-2xl font-semibold tracking-[0.12em] text-ink uppercase md:text-3xl">
              Wholesale Contact Form
            </h1>
            <p className="text-sm text-muted md:text-base">
              Enter your contact info and our wholesale team will be in touch.
            </p>
          </header>

          <WholesaleContactForm />
        </div>
      </div>
    </div>
  );
}
