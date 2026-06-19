"use client";

import Image from "next/image";
import { benefits } from "@/data/content";
import { FadeIn } from "@/components/ui/motion";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  images?: string[];
};

export function HomeShowcase({ images = [] }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section id="how-it-works" className="section bg-ink text-white" ref={containerRef}>
      <div className="container-wide">
        <FadeIn className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            How It Works
          </p>
          <h2 className="mb-4 text-[clamp(2rem,4vw,3rem)] text-white">
            Wrap. Warm. Go.
          </h2>
          <p className="mx-auto max-w-xl text-lg text-white/60">
            Three simple steps — the same effortless flow that makes premium products feel
            intuitive from the first touch.
          </p>
        </FadeIn>

        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div style={{ y: imageY }} className="sticky top-28 hidden lg:block">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] ring-1 ring-white/10">
              {images[0] ? (
                <Image
                  src={images[0]}
                  alt="Nova Triggers belt in use"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              ) : (
                <div className="image-placeholder h-full">Showcase image</div>
              )}
            </div>
          </motion.div>

          <div className="space-y-0">
            {benefits.slice(0, 3).map((step, i) => (
              <FadeIn key={step.title} delay={i * 0.1}>
                <div className="group border-t border-white/10 py-10 first:border-t-0 lg:first:border-t lg:first:pt-0">
                  <div className="mb-6 flex items-start gap-6 lg:hidden">
                    <div className="relative h-48 w-full overflow-hidden rounded-2xl ring-1 ring-white/10">
                      {images[i] ? (
                        <Image src={images[i]} alt={step.title} fill className="object-cover" sizes="100vw" />
                      ) : null}
                    </div>
                  </div>
                  <span className="mb-3 block font-heading text-5xl text-white/15 transition-colors group-hover:text-coral/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mb-3 font-heading text-2xl text-white">{step.title}</h3>
                  <p className="max-w-md leading-relaxed text-white/60">{step.description}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
