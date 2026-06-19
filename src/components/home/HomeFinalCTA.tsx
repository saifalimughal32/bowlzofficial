"use client";

import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";
import { bundles, siteConfig } from "@/data/content";
import { DEFAULT_HANDLE } from "@/lib/shopify";

export function HomeFinalCTA() {
  return (
    <section className="section section-ink relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-plum/25 blur-[100px]" />
      </div>

      <div className="container-main relative text-center">
        <FadeIn>
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/70">
            <Shield className="h-4 w-4 text-coral" />
            30-Night Comfort Guarantee
          </div>

          <h2 className="mx-auto mb-5 max-w-2xl text-[clamp(2rem,5vw,3.5rem)] leading-tight text-white">
            Your next period doesn&apos;t have to steal your day
          </h2>

          <p className="mx-auto mb-10 max-w-lg text-lg text-white/60">
            Join {siteConfig.customerCount} women who chose warmth that moves with them.
            Try it risk-free for a full cycle.
          </p>

          <Button asChild size="xl" className="group">
            <Link href={`/products/${DEFAULT_HANDLE}`}>
              Get Soothing Relief
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>

          <p className="mt-6 text-sm text-white/40">
            From ${Math.min(...bundles.map((b) => b.price))} · Free shipping over $
            {siteConfig.freeShippingThreshold}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
