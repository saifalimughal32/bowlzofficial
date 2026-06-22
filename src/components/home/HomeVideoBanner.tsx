"use client";

import Link from "next/link";
import { useRef } from "react";

const HERO_VIDEO = "/videos/bongz-hero.mp4";

export function HomeVideoBanner() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative flex min-h-svh w-full items-center justify-center overflow-hidden bg-black">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label="Bowlz magnetic bowl brand video"
      >
        <source src={HERO_VIDEO} type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-black/45" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-24 text-center sm:px-6 md:px-10 md:py-32">
        <h1 className="hero-headline mb-8 text-white md:mb-10">
          Magnetic Bowls Built for
          <br className="hidden sm:block" />
          <span className="sm:hidden"> </span>
          Your Session, Not Your Floor.
        </h1>
        <Link href="/shop" className="btn-pill btn-pill-white pointer-events-auto">
          Shop Bowlz
        </Link>
      </div>
    </section>
  );
}
