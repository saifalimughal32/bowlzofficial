"use client";

import { faqs } from "@/data/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeIn } from "@/components/ui/motion";

export function HomeFAQ() {
  return (
    <section id="faq" className="section">
      <div className="container-main">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-start">
          <FadeIn>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
              FAQ
            </p>
            <h2 className="mb-4 text-[clamp(2rem,4vw,3rem)]">Questions? We&apos;ve got you.</h2>
            <p className="text-lg leading-relaxed text-taupe-dark">
              Everything you need to know before your first cycle with Nova Triggers.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} value={`item-${i}`}>
                  <AccordionTrigger className="text-base">{faq.q}</AccordionTrigger>
                  <AccordionContent>{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
