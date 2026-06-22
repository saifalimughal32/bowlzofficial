"use client";

import { Users, Shield, Ruler, Sparkles } from "lucide-react";
import { siteConfig, trustSignals } from "@/data/content";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

const icons = [Users, Shield, Ruler, Sparkles];

export function TrustBar() {
  return (
    <section className="border-y border-black/8 bg-white py-10 md:py-12">
      <div className="container-main">
        <ul className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          {trustSignals.map((item, i) => {
            const Icon = icons[i] ?? Sparkles;
            return (
              <li key={item.label} className="flex flex-col items-center text-center">
                <Icon className="mb-3 h-7 w-7 text-brand md:h-8 md:w-8" strokeWidth={1.5} />
                <p className="text-xs font-bold uppercase tracking-[0.06em] text-ink md:text-sm">
                  {"animateCount" in item && item.animateCount ? (
                    <>
                      <AnimatedCounter
                        end={siteConfig.customerCountValue}
                        suffix="+"
                        className="tabular-nums"
                      />{" "}
                      {item.label}
                    </>
                  ) : (
                    item.label
                  )}
                </p>
                <p className="mt-1 text-xs text-muted">{item.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
