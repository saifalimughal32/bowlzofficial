"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ColorSwatches } from "@/components/product/ColorSwatches";
import type { StoreProduct } from "@/data/content";
import { cn } from "@/lib/utils";

type Props = {
  product: StoreProduct;
  priority?: boolean;
  showSwatches?: boolean;
};

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function savePercent(price: number, compareAt: number) {
  return Math.round((1 - price / compareAt) * 100);
}

export function ProductCard({ product, priority = false, showSwatches = false }: Props) {
  const [activeColorIndex, setActiveColorIndex] = useState(0);

  const onSale = product.compareAt != null && product.compareAt > product.priceMin;
  const soldOut = product.soldOut === true;
  const colors = product.colors ?? [];
  const activeImage =
    (showSwatches && colors[activeColorIndex]?.image) || product.image;

  let badge = product.badge ?? null;
  if (!badge && soldOut) badge = "Sold Out";
  else if (!badge && onSale && product.compareAt) {
    badge = `Save ${savePercent(product.priceMin, product.compareAt)}%`;
  }

  const badgeVariant =
    badge?.toLowerCase().includes("sold") ? "sold-out" : "sale";

  return (
    <Link href={`/products/${product.handle}`} className="group block">
      <div className="product-card-image relative mb-3 bg-white md:mb-4">
        {badge && (
          <span
            className={
              badgeVariant === "sold-out"
                ? "product-badge product-badge-sold"
                : "product-badge product-badge-sale"
            }
          >
            {badge}
          </span>
        )}
        <Image
          src={activeImage}
          alt={product.title}
          fill
          className={cn(
            "product-card-img object-contain p-3 transition-opacity duration-200 md:p-4",
            showSwatches && colors.length > 1 && "object-cover"
          )}
          sizes="(max-width: 640px) 50vw, 50vw"
          priority={priority}
        />
      </div>
      <h3 className="mb-1.5 text-center text-sm font-medium leading-snug text-ink md:text-[0.9375rem]">
        {product.title}
      </h3>
      {showSwatches && colors.length > 1 && (
        <ColorSwatches
          colors={colors}
          activeIndex={activeColorIndex}
          onSelect={setActiveColorIndex}
          className="mb-2"
        />
      )}
      <p className="text-center text-sm md:text-[0.9375rem]">
        {onSale && (
          <span className="mr-1.5 text-ink line-through">
            {formatAmount(product.compareAt!)}
          </span>
        )}
        <span className={onSale ? "font-medium text-red-600" : "text-ink"}>
          {formatAmount(product.priceMin)}
        </span>
      </p>
    </Link>
  );
}

export function formatPrice(product: StoreProduct) {
  if (product.priceMin === product.priceMax) {
    return formatAmount(product.priceMin);
  }
  return `${formatAmount(product.priceMin)} – ${formatAmount(product.priceMax)}`;
}
