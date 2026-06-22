"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/home/ProductCard";
import type { StoreProduct } from "@/data/content";
import { cn } from "@/lib/utils";

type Props = {
  products: StoreProduct[];
  showSwatches?: boolean;
  showAddToCart?: boolean;
  className?: string;
};

export function ProductCarousel({
  products,
  showSwatches = false,
  showAddToCart = true,
  className,
}: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < maxScroll - 2);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, products]);

  function scroll(direction: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;

    const slide = el.querySelector<HTMLElement>("[data-carousel-slide]");
    const gap = parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap) || 24;
    const amount = slide ? slide.offsetWidth + gap : el.clientWidth * 0.8;

    el.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <div className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => scroll("left")}
        disabled={!canScrollLeft}
        aria-label="Previous products"
        className={cn(
          "product-carousel-nav product-carousel-nav-left",
          !canScrollLeft && "pointer-events-none opacity-0"
        )}
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={2} />
      </button>

      <div
        ref={scrollRef}
        className="product-carousel-track -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-2 md:-mx-8 md:gap-6 md:px-8 lg:-mx-10 lg:px-10"
      >
        {products.map((product, i) => (
          <div
            key={product.handle}
            data-carousel-slide
            className="w-[calc(50%-0.625rem)] shrink-0 snap-start sm:w-[min(42%,220px)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]"
          >
            <ProductCard
              product={product}
              priority={i < 2}
              showSwatches={showSwatches}
              showAddToCart={showAddToCart}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scroll("right")}
        disabled={!canScrollRight}
        aria-label="Next products"
        className={cn(
          "product-carousel-nav product-carousel-nav-right",
          !canScrollRight && "pointer-events-none opacity-0"
        )}
      >
        <ChevronRight className="h-5 w-5" strokeWidth={2} />
      </button>
    </div>
  );
}
