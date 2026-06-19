"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { PaymentIcons } from "@/components/ui/PaymentIcons";
import { ImageSlot } from "@/components/ui/ImageSlot";
import { buyBoxBullets, bundles, siteConfig } from "@/data/content";
import { formatMoney, type Product } from "@/lib/shopify";

type Props = { product: Product };

export function ProductBuyBox({ product }: Props) {
  const { addItem, isLoading, justAdded } = useCart();
  const [selectedIndex, setSelectedIndex] = useState(
    () => bundles.findIndex((b) => b.default) || 1
  );
  const [addedPulse, setAddedPulse] = useState(false);

  const selectedBundle = bundles[selectedIndex];
  const selectedVariant = product.variants[selectedIndex] ?? product.variants[0];
  const cartQuantity = selectedBundle?.qty ?? 1;
  const hasDedicatedVariant = Boolean(product.variants[selectedIndex]);

  const displayPrice = hasDedicatedVariant && selectedVariant
    ? formatMoney(selectedVariant.price.amount, selectedVariant.price.currencyCode)
    : `$${selectedBundle?.price ?? bundles[0]?.price ?? 55.58}`;

  const comparePrice = hasDedicatedVariant && selectedVariant?.compareAtPrice
    ? formatMoney(selectedVariant.compareAtPrice.amount, selectedVariant.compareAtPrice.currencyCode)
    : selectedBundle?.compareAt
      ? `$${selectedBundle.compareAt}`
      : null;

  const saveAmount = useMemo(() => {
    if (hasDedicatedVariant && selectedVariant?.compareAtPrice) {
      const compare = parseFloat(selectedVariant.compareAtPrice.amount);
      const price = parseFloat(selectedVariant.price.amount);
      return compare > price ? Math.round(compare - price) : null;
    }
    return selectedBundle?.save ?? null;
  }, [hasDedicatedVariant, selectedVariant, selectedBundle]);

  useEffect(() => {
    if (justAdded) {
      setAddedPulse(true);
      const t = setTimeout(() => setAddedPulse(false), 600);
      return () => clearTimeout(t);
    }
  }, [justAdded]);

  const handleAdd = () => {
    const variant = product.variants[selectedIndex] ?? product.variants[0];
    if (variant) addItem(variant.id, cartQuantity);
  };

  return (
    <>
      <div id="buybox" className="lg:sticky lg:top-24">
        <h1 className="mb-2 text-[clamp(1.5rem,3vw,2rem)]">{product.title}</h1>

        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gold">★★★★★</span>
          <span className="text-taupe-dark">
            {siteConfig.starRating} ({siteConfig.reviewCount})
          </span>
          <span className="text-caption">·</span>
          <Link href="#reviews" className="underline text-taupe-dark hover:text-plum">
            {siteConfig.customerCount} women
          </Link>
        </div>

        <p className="mb-6 italic text-taupe-dark">
          &ldquo;Heats in 3 seconds — warmth and vibration that goes wherever you do.&rdquo;
        </p>

        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-plum">
          Choose your bundle:
        </p>

        <div className="mb-6 space-y-3">
          {bundles.map((bundle, i) => {
            const variant = product.variants[i];
            const isSelected = selectedIndex === i;
            const bundlePrice = variant
              ? formatMoney(variant.price.amount, variant.price.currencyCode)
              : `$${bundle.price}`;
            return (
              <label
                key={bundle.qty}
                className={`relative block cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 ${
                  isSelected
                    ? "bundle-selected scale-[1.01]"
                    : "border-plum/15 bg-white hover:border-plum/30"
                }`}
              >
                <input
                  type="radio"
                  name="bundle"
                  className="sr-only"
                  checked={isSelected}
                  onChange={() => setSelectedIndex(i)}
                />
                {bundle.badge && (
                  <span className="absolute -top-2.5 right-4 rounded-full bg-plum px-2.5 py-1 text-[0.6875rem] font-bold uppercase text-white">
                    {bundle.badge}
                  </span>
                )}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200 ${
                        isSelected ? "border-plum bg-plum text-white" : "border-plum/25"
                      }`}
                    >
                      {isSelected && (
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                    </span>
                    <div>
                      <div className="font-semibold">{variant?.title ?? bundle.label}</div>
                      {bundle.subtitle && (
                        <div className="text-sm text-coral">{bundle.subtitle}</div>
                      )}
                    </div>
                  </div>
                  <div className="font-bold text-plum">{bundlePrice}</div>
                </div>
              </label>
            );
          })}
        </div>

        <div className="mb-1 flex items-baseline gap-3">
          <span className="text-3xl font-bold">{displayPrice}</span>
          {comparePrice && (
            <span className="text-lg text-caption line-through">{comparePrice}</span>
          )}
        </div>
        {saveAmount && (
          <div className="mb-2 font-semibold text-coral">Save ${saveAmount}</div>
        )}
        <p className="mb-6 text-sm text-taupe-dark">
          or 4 interest-free payments with Shop Pay / Klarna
        </p>

        <button
          type="button"
          onClick={handleAdd}
          disabled={isLoading || selectedVariant?.availableForSale === false}
          className={`btn-primary btn-full btn-primary-lg disabled:opacity-50 ${addedPulse ? "btn-success-pulse" : ""}`}
        >
          {isLoading ? "Adding…" : justAdded ? "Added ✓" : "Add to Cart →"}
        </button>

        <TrustBadges />
        <PaymentIcons className="mt-4" />

        <ul className="mt-6 space-y-2.5">
          {buyBoxBullets.map((b) => (
            <li
              key={b}
              className="relative pl-7 text-[0.9375rem] text-taupe-dark before:absolute before:left-0 before:font-bold before:text-coral before:content-['✓']"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>

      <StickyAtc
        price={displayPrice}
        label={selectedBundle?.label ?? selectedVariant?.title ?? "1 Belt"}
        onAdd={handleAdd}
        isLoading={isLoading}
      />
    </>
  );
}

function StickyAtc({
  price,
  label,
  onAdd,
  isLoading,
}: {
  price: string;
  label: string;
  onAdd: () => void;
  isLoading: boolean;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = document.getElementById("buybox");
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[99] border-t border-plum/10 bg-white/95 px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-transform duration-300 lg:hidden ${visible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 shrink">
          <div className="truncate text-xs text-taupe-dark">{label}</div>
          <div className="text-lg font-bold">{price}</div>
        </div>
        <button
          type="button"
          onClick={onAdd}
          disabled={isLoading}
          className="btn-primary min-h-[48px] flex-1 py-3 disabled:opacity-50"
        >
          Add to Cart →
        </button>
      </div>
    </div>
  );
}

export function ProductGallery({ product }: Props) {
  const [active, setActive] = useState(0);
  const images = product.images.length > 0 ? product.images : [];

  const galleryLabels = [
    { label: "Hero lifestyle", hint: "Woman using product" },
    { label: "On-body wear", hint: "Under clothing" },
    { label: "Controls", hint: "Heat + vibration settings" },
    { label: "Scale", hint: "In-hand size reference" },
    { label: "Packaging", hint: "Unboxing shot" },
  ];

  return (
    <div>
      <div className="mb-3">
        {images[active]?.url ? (
          <div className="image-slot aspect-square">
            <Image
              src={images[active].url}
              alt={images[active].altText || product.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        ) : (
          <ImageSlot
            src=""
            alt={product.title}
            label={galleryLabels[active]?.label ?? "Product photo"}
            hint={galleryLabels[active]?.hint}
            aspect="square"
            priority
          />
        )}
      </div>
      <div className="grid grid-cols-5 gap-2">
        {galleryLabels.map((g, i) => (
          <button
            key={g.label}
            type="button"
            onClick={() => setActive(i)}
            className={`aspect-square overflow-hidden rounded-lg transition-all duration-200 ${
              active === i ? "ring-2 ring-plum ring-offset-1" : "opacity-60 hover:opacity-90"
            }`}
          >
            {images[i]?.url ? (
              <Image src={images[i].url} alt="" width={100} height={100} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center bg-rose/40 text-[0.5rem] uppercase text-plum/50">
                {i + 1}
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
