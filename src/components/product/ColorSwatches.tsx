"use client";

import type { ProductColor } from "@/lib/productColors";
import { cn } from "@/lib/utils";

type Props = {
  colors: ProductColor[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
  className?: string;
};

export function ColorSwatches({
  colors,
  activeIndex = 0,
  onSelect,
  className,
}: Props) {
  if (colors.length <= 1) return null;

  return (
    <div
      className={cn("flex flex-wrap items-center justify-center gap-1.5", className)}
      aria-label="Available colors"
    >
      {colors.map((color, index) => {
        const isActive = index === activeIndex;

        return (
          <button
            key={color.name}
            type="button"
            title={color.name}
            aria-label={color.name}
            aria-pressed={isActive}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              onSelect?.(index);
            }}
            className={cn(
              "color-swatch h-[18px] w-[18px] rounded-full border transition-transform md:h-5 md:w-5",
              isActive
                ? "border-ink ring-2 ring-ink ring-offset-1"
                : "border-black/15 hover:scale-110"
            )}
            style={{ backgroundColor: color.hex }}
          />
        );
      })}
    </div>
  );
}
