"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { bundles } from "@/data/content";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn, LiftCard } from "@/components/ui/motion";
import { DEFAULT_HANDLE } from "@/lib/shopify";

export function HomeBundles() {
  const popular = bundles.find((b) => b.default) ?? bundles[1];

  return (
    <section className="section section-alt">
      <div className="container-main">
        <FadeIn className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            Choose Your Bundle
          </p>
          <h2 className="mb-4 text-[clamp(2rem,4vw,3rem)]">
            More belts, more savings
          </h2>
          <p className="text-lg text-taupe-dark">
            One for home, one for your bag — or share with the women you love.
          </p>
        </FadeIn>

        <div className="grid gap-5 md:grid-cols-3">
          {bundles.map((bundle, i) => (
            <FadeIn key={bundle.qty} delay={i * 0.1}>
              <LiftCard
                className={`relative flex h-full flex-col p-7 ${
                  bundle.default ? "ring-2 ring-plum" : ""
                }`}
              >
                {bundle.badge && (
                  <Badge className="absolute -top-3 right-6">{bundle.badge}</Badge>
                )}
                <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-coral">
                  {bundle.qty} Belt{bundle.qty > 1 ? "s" : ""}
                </p>
                <h3 className="mb-2 font-heading text-xl text-ink">{bundle.label.split(" — ")[1] ?? bundle.label}</h3>
                {bundle.subtitle && (
                  <p className="mb-4 text-sm text-coral">{bundle.subtitle}</p>
                )}
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="font-heading text-4xl text-ink">${bundle.price}</span>
                  {bundle.compareAt && (
                    <span className="text-lg text-caption line-through">
                      ${bundle.compareAt}
                    </span>
                  )}
                </div>
                <ul className="mb-8 flex-1 space-y-2">
                  {["Free USA shipping", "30-night guarantee", "Ships in 1 day"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-taupe-dark">
                      <Check className="h-4 w-4 shrink-0 text-coral" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={bundle.default ? "default" : "outline"}
                  className="w-full"
                >
                  <Link href={`/products/${DEFAULT_HANDLE}`}>
                    Add to Cart
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </LiftCard>
            </FadeIn>
          ))}
        </div>

        {popular && (
          <FadeIn delay={0.3} className="mt-8 text-center">
            <p className="text-sm text-taupe-dark">
              Most women choose the{" "}
              <strong className="text-plum">{popular.label.split(" — ")[0]}</strong> — from $
              {popular.price}
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
