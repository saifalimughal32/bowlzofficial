"use client";

import { useState } from "react";
import Image from "next/image";
import { ugcClips } from "@/data/content";
import { AnimateIn } from "@/components/ui/AnimateIn";

type Props = { posterImages?: string[] };

export function VideoDemo({ posterImages = [] }: Props) {
  const [activeClip, setActiveClip] = useState(0);
  const hasPosters = posterImages.length > 0;

  return (
    <section className="section section-alt" id="ugc">
      <div className="container-main">
        <AnimateIn>
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-[clamp(1.75rem,4vw,2.5rem)]">
              See the belt in action
            </h2>
            <p className="text-taupe-dark">
              Real product photos — heat levels, vibration modes, and everyday wear.
            </p>
          </div>
        </AnimateIn>

        <div className="grid gap-4 sm:grid-cols-3">
          {ugcClips.map((clip, i) => {
            const poster = posterImages[i];
            return (
              <AnimateIn key={clip.id} delay={(i + 1) as 1 | 2 | 3}>
                <button
                  type="button"
                  onClick={() => setActiveClip(i)}
                  className={`ugc-reel relative w-full text-left ${activeClip === i ? "ring-2 ring-coral" : ""}`}
                >
                  {clip.videoSrc ? (
                    <video
                      src={clip.videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="h-full w-full object-cover"
                    />
                  ) : poster ? (
                    <>
                      <Image
                        src={poster}
                        alt={clip.label}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-2xl text-plum shadow-lg">
                          ▶
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-white/80">
                      <span className="text-3xl">▶</span>
                      <span className="text-xs font-semibold uppercase tracking-wider">{clip.label}</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-8">
                    <p className="text-sm font-medium text-white">{clip.caption}</p>
                  </div>
                </button>
              </AnimateIn>
            );
          })}
        </div>

        {!hasPosters && (
          <p className="mt-6 text-center text-xs text-caption">
            Add TikTok-style UGC videos to /public/videos/ for autoplay reels
          </p>
        )}
      </div>
    </section>
  );
}
