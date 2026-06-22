"use client";

import { useState } from "react";

type Props = {
  description: string;
};

export function ProductDescription({ description }: Props) {
  const [expanded, setExpanded] = useState(false);
  const clean = description.replace(/\s+/g, " ").trim();
  if (!clean) return null;

  const isLong = clean.length > 280;
  const display = isLong && !expanded ? `${clean.slice(0, 280)}…` : clean;

  return (
    <section className="border-t border-black/8 bg-white py-10 md:py-14">
      <div className="container-main max-w-3xl">
        <h2 className="mb-4 text-lg font-bold text-ink md:text-xl">About this product</h2>
        <p className="text-sm leading-relaxed text-muted md:text-base">{display}</p>
        {isLong && (
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="mt-3 text-sm font-semibold text-brand underline-offset-2 hover:underline"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </section>
  );
}
