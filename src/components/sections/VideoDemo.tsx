"use client";

import { useState } from "react";
import { ugcClips } from "@/data/content";
import { AnimateIn } from "@/components/ui/AnimateIn";

export function VideoDemo() {
  const [activeClip, setActiveClip] = useState(0);

  return (
    <section className="section section-alt" id="ugc">
      <div className="container-main">
        <AnimateIn>
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-[clamp(1.75rem,4vw,2.5rem)]">
              See how women wear Nova Triggers all day
            </h2>
            <p className="text-taupe-dark">
              Real women. Real comfort. From morning coffee to evening wind-down.
            </p>
          </div>
        </AnimateIn>

        <div className="grid gap-4 sm:grid-cols-3">
          {ugcClips.map((clip, i) => (
            <AnimateIn key={clip.id} delay={(i + 1) as 1 | 2 | 3}>
              <button
                type="button"
                onClick={() => setActiveClip(i)}
                className={`ugc-reel w-full text-left ${activeClip === i ? "ring-2 ring-coral" : ""}`}
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
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center text-white/80">
                    <span className="text-3xl">▶</span>
                    <span className="text-xs font-semibold uppercase tracking-wider">{clip.label}</span>
                    <span className="text-xs opacity-70">Add UGC video</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 pt-8">
                  <p className="text-sm font-medium text-white">{clip.caption}</p>
                </div>
              </button>
            </AnimateIn>
          ))}
        </div>

        <p className="mt-6 text-center text-xs text-caption">
          Tap a clip to preview · Add your TikTok-style UGC videos to /public/videos/
        </p>
      </div>
    </section>
  );
}
