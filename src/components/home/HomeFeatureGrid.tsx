"use client";

import Image from "next/image";
import { homeFeatures } from "@/data/content";
import { FadeIn, LiftCard, StaggerContainer, StaggerItem } from "@/components/ui/motion";

type Props = { images?: string[] };

export function HomeFeatureGrid({ images = [] }: Props) {
  return (
    <section id="features" className="section section-alt">
      <div className="container-main">
        <FadeIn className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-coral">
            Designed for Real Life
          </p>
          <h2 className="mb-5 text-[clamp(2rem,4vw,3rem)] leading-tight">
            Every detail, engineered for comfort
          </h2>
          <p className="text-lg leading-relaxed text-taupe-dark">
            Inspired by premium product design — thoughtful features that disappear into
            your day while delivering instant relief when you need it most.
          </p>
        </FadeIn>

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homeFeatures.map((feature, i) => (
            <StaggerItem key={feature.title}>
              <LiftCard className="group h-full overflow-hidden">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  {images[i] ? (
                    <Image
                      src={images[i]}
                      alt={feature.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs uppercase tracking-wider text-plum/30">
                      Feature {i + 1}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
                <div className="p-6">
                  <span className="mb-2 block text-[0.6875rem] font-bold uppercase tracking-[0.15em] text-coral">
                    0{i + 1}
                  </span>
                  <h3 className="mb-2 font-heading text-xl text-ink">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-taupe-dark">
                    {feature.description}
                  </p>
                </div>
              </LiftCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
