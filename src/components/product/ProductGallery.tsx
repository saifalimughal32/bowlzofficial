"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/shopify";

type Props = { product: Product };

export function ProductGallery({ product }: Props) {
  const [active, setActive] = useState(0);
  const images = product.images.length > 0 ? product.images : [];

  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        {images[active]?.url ? (
          <Image
            src={images[active].url}
            alt={images[active].altText || product.title}
            fill
            className="object-contain p-4 md:p-6"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            {product.title}
          </div>
        )}
      </div>

      {images.length > 1 && (
        <div className="product-gallery-thumbs">
          {images.slice(0, 6).map((image, i) => (
            <button
              key={image.url}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              aria-pressed={active === i}
              className={`product-gallery-thumb ${active === i ? "product-gallery-thumb-active" : ""}`}
            >
              <Image
                src={image.url}
                alt={image.altText || `${product.title} ${i + 1}`}
                width={88}
                height={88}
                className="h-full w-full object-contain p-1"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
