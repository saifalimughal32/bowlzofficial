"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { PaymentIcons } from "@/components/ui/PaymentIcons";
import { VariantOptionPicker } from "@/components/product/VariantOptionPicker";
import { getProductCategoryLabel, isBowlProduct } from "@/lib/productCategory";
import {
  bongzBuyBoxBullets,
  buyBoxBullets,
  bundles,
  isBundleProduct,
  siteConfig,
} from "@/data/content";
import { formatMoney, type Product } from "@/lib/shopify";

type Props = { product: Product };

export function ProductBuyBox({ product }: Props) {
  if (isBundleProduct(product.handle)) {
    return <BundleProductBuyBox product={product} />;
  }

  return <StandardProductBuyBox product={product} />;
}

function StandardProductBuyBox({ product }: Props) {
  const { addItem, isLoading, justAdded } = useCart();
  const [addedPulse, setAddedPulse] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const variant = product.variants[selectedIndex] ?? product.variants[0];

  const displayPrice = variant
    ? formatMoney(variant.price.amount, variant.price.currencyCode)
    : "$0";

  const comparePrice = variant?.compareAtPrice
    ? formatMoney(variant.compareAtPrice.amount, variant.compareAtPrice.currencyCode)
    : null;

  const saveAmount = useMemo(() => {
    if (!variant?.compareAtPrice) return null;
    const compare = parseFloat(variant.compareAtPrice.amount);
    const price = parseFloat(variant.price.amount);
    return compare > price ? Math.round(compare - price) : null;
  }, [variant]);

  const bullets =
    product.handle === "swabz" || product.handle.includes("replacement")
      ? buyBoxBullets.slice(2, 5)
      : product.handle === "tubez" ||
          product.handle === "beakerz" ||
          product.handle === "percs"
        ? bongzBuyBoxBullets
        : buyBoxBullets;

  const categoryLabel = getProductCategoryLabel(product.handle);

  useEffect(() => {
    if (justAdded) {
      setAddedPulse(true);
      const t = setTimeout(() => setAddedPulse(false), 600);
      return () => clearTimeout(t);
    }
  }, [justAdded]);

  const handleAdd = () => {
    if (variant) addItem(variant.id, 1);
  };

  return (
    <>
      <div id="buybox" className="product-buy-card lg:sticky lg:top-28">
        <p className="product-buy-label">{categoryLabel}</p>
        <h1 className="mb-3 text-[clamp(1.375rem,3.5vw,2rem)] font-bold leading-tight text-ink">
          {product.title}
        </h1>

        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gold">★★★★★</span>
          <span className="font-medium text-ink">
            {siteConfig.starRating} ({siteConfig.reviewCount})
          </span>
          <span className="text-muted">·</span>
          <Link href="#reviews" className="font-medium text-brand underline-offset-2 hover:underline">
            {siteConfig.customerCount} customers
          </Link>
        </div>

        <div className="mb-1 flex flex-wrap items-baseline gap-3">
          <span className="product-buy-price">{displayPrice}</span>
          {comparePrice && (
            <span className="text-lg text-muted line-through">{comparePrice}</span>
          )}
        </div>
        {saveAmount && (
          <p className="mb-2 text-sm font-semibold text-red-600">Save ${saveAmount}</p>
        )}
        <p className="mb-5 text-sm text-muted">
          or 4 interest-free payments with Shop Pay / Klarna
        </p>

        <VariantOptionPicker product={product} onSelect={setSelectedIndex} />

        {isBowlProduct(product.handle) && (
          <p className="mb-5 text-sm">
            <Link
              href="#sizing-guide"
              className="font-semibold text-brand underline-offset-2 hover:underline"
            >
              Bowl sizing guide →
            </Link>
          </p>
        )}

        {variant?.availableForSale !== false && (
          <p className="mb-4 text-sm font-semibold text-brand">In stock — ready to ship</p>
        )}

        <button
          type="button"
          onClick={handleAdd}
          disabled={isLoading || variant?.availableForSale === false}
          className={`btn-primary btn-full btn-primary-lg disabled:opacity-50 ${addedPulse ? "btn-success-pulse" : ""}`}
        >
          {variant?.availableForSale === false
            ? "Sold Out"
            : isLoading
              ? "Adding…"
              : justAdded
                ? "Added ✓"
                : "Add to Cart"}
        </button>

        <TrustBadges />
        <PaymentIcons className="mt-4" />

        <div className="product-buy-divider" />

        <ul className="space-y-2.5">
          {bullets.map((b) => (
            <li
              key={b}
              className="relative pl-7 text-[0.9375rem] leading-snug text-muted before:absolute before:left-0 before:font-bold before:text-brand before:content-['✓']"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>

      <StickyAtc
        price={displayPrice}
        label={product.title}
        onAdd={handleAdd}
        isLoading={isLoading}
        disabled={variant?.availableForSale === false}
      />
    </>
  );
}

function BundleProductBuyBox({ product }: Props) {
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
    : `$${selectedBundle?.price ?? bundles[0]?.price ?? 35}`;

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
      <div id="buybox" className="product-buy-card lg:sticky lg:top-28">
        <p className="product-buy-label">{getProductCategoryLabel(product.handle)}</p>
        <h1 className="mb-3 text-[clamp(1.375rem,3.5vw,2rem)] font-bold leading-tight text-ink">
          {product.title}
        </h1>

        <div className="mb-5 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-gold">★★★★★</span>
          <span className="font-medium text-ink">
            {siteConfig.starRating} ({siteConfig.reviewCount})
          </span>
          <span className="text-muted">·</span>
          <Link href="#reviews" className="font-medium text-brand underline-offset-2 hover:underline">
            {siteConfig.customerCount} customers
          </Link>
        </div>

        <p className="mb-5 text-sm italic leading-relaxed text-muted md:text-base">
          &ldquo;The magnetic bowl that started it all — shatterproof and cleans with one wipe.&rdquo;
        </p>

        <p className="mb-3 text-xs font-bold uppercase tracking-[0.12em] text-ink">
          Choose your bundle
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

        <div className="mb-1 flex flex-wrap items-baseline gap-3">
          <span className="product-buy-price">{displayPrice}</span>
          {comparePrice && (
            <span className="text-lg text-muted line-through">{comparePrice}</span>
          )}
        </div>
        {saveAmount && (
          <p className="mb-2 text-sm font-semibold text-red-600">Save ${saveAmount}</p>
        )}
        <p className="mb-5 text-sm text-muted">
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

        <div className="product-buy-divider" />

        <ul className="space-y-2.5">
          {buyBoxBullets.map((b) => (
            <li
              key={b}
              className="relative pl-7 text-[0.9375rem] leading-snug text-muted before:absolute before:left-0 before:font-bold before:text-brand before:content-['✓']"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>

      <StickyAtc
        price={displayPrice}
        label={selectedBundle?.label ?? selectedVariant?.title ?? product.title}
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
  disabled = false,
}: {
  price: string;
  label: string;
  onAdd: () => void;
  isLoading: boolean;
  disabled?: boolean;
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
      className={`fixed bottom-0 left-0 right-0 z-[99] border-t border-plum/10 bg-white/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-transform duration-300 lg:hidden ${visible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 shrink">
          <div className="truncate text-xs text-taupe-dark">{label}</div>
          <div className="text-lg font-bold">{price}</div>
        </div>
        <button
          type="button"
          onClick={onAdd}
          disabled={isLoading || disabled}
          className="btn-primary min-h-[48px] flex-1 py-3 disabled:opacity-50"
        >
          {disabled ? "Sold Out" : "Add to Cart →"}
        </button>
      </div>
    </div>
  );
}
