"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/data/content";
import { DEFAULT_HANDLE } from "@/lib/shopify";

type Props = {
  heroImage?: string;
  secondaryImage?: string;
};

export function HomeHero({ heroImage, secondaryImage }: Props) {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-ink text-white">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-plum/30 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-coral/20 blur-[100px]" />
      </div>

      <div className="container-wide relative flex min-h-[100svh] flex-col justify-center pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <Badge variant="coral" className="mb-6 border border-coral/20 bg-coral/10 text-coral">
              New · Ships from California
            </Badge>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-white/50">
              Nova Triggers
            </p>

            <h1 className="mb-2 font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] text-white">
              Warmth That
              <br />
              <span className="text-gradient bg-gradient-to-r from-rose via-blush to-coral bg-clip-text text-transparent">
                Moves With You
              </span>
            </h1>

            <p className="mb-8 max-w-md text-lg leading-relaxed text-white/70">
              Heated menstrual relief belt — 3-second warmth, 3 heat levels, 3 vibration
              modes. Discreet under your clothes, from bed to desk to everywhere else.
            </p>

            <div className="mb-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <div className="flex text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <span className="text-sm text-white/80">
                  {siteConfig.starRating} · {siteConfig.reviewCount} reviews
                </span>
              </div>
              <span className="hidden h-4 w-px bg-white/20 sm:block" />
              <span className="text-sm text-white/60">
                {siteConfig.customerCount} women
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="group">
                <Link href={`/products/${DEFAULT_HANDLE}`}>
                  Shop the Belt
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>

            <p className="mt-6 text-sm text-white/45">
              Free USA shipping over ${siteConfig.freeShippingThreshold} · 30-night guarantee
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative mx-auto aspect-[4/5] max-w-[520px]">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-plum/40 to-coral/20 blur-2xl" />
              {heroImage ? (
                <div className="animate-float relative h-full overflow-hidden rounded-[2rem] ring-1 ring-white/10">
                  <Image
                    src={heroImage}
                    alt="Nova Triggers heated menstrual relief vibration belt"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 520px"
                  />
                </div>
              ) : (
                <div className="animate-float image-placeholder aspect-[4/5] h-full">
                  Product hero image
                </div>
              )}

              {secondaryImage && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  className="absolute -bottom-6 -left-6 hidden h-28 w-28 overflow-hidden rounded-2xl ring-2 ring-white/20 md:block lg:-left-10 lg:h-36 lg:w-36"
                >
                  <Image src={secondaryImage} alt="" fill className="object-cover" sizes="144px" />
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-2 top-8 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-md md:-right-6"
              >
                <p className="text-xs uppercase tracking-wider text-white/50">Heats in</p>
                <p className="font-heading text-2xl text-white">3 sec</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        >
          <span className="text-[0.625rem] uppercase tracking-[0.2em] text-white/30">Scroll</span>
          <div className="h-10 w-px bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
