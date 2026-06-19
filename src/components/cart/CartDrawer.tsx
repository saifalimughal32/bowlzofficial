"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "./CartProvider";
import { formatMoney } from "@/lib/shopify";
import { siteConfig, cartUpsell } from "@/data/content";
import { PaymentIcons } from "@/components/ui/PaymentIcons";

function FreeShippingBar({ subtotal }: { subtotal: number }) {
  const threshold = siteConfig.freeShippingThreshold;
  const remaining = Math.max(0, threshold - subtotal);
  const progress = Math.min(100, (subtotal / threshold) * 100);

  if (remaining <= 0) {
    return (
      <div className="mb-4 rounded-xl bg-cream px-4 py-3 text-center text-sm font-medium text-plum">
        🎉 You&apos;ve unlocked free USA shipping!
      </div>
    );
  }

  return (
    <div className="mb-4 rounded-xl bg-cream px-4 py-3">
      <p className="mb-2 text-center text-sm text-taupe-dark">
        Add <span className="font-semibold text-plum">${remaining.toFixed(0)}</span> for free shipping
      </p>
      <div className="shipping-progress">
        <div className="shipping-progress-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { cart, isOpen, closeCart, checkout, removeLine, updateLine, addItem, isLoading } = useCart();
  const [upsellAdded, setUpsellAdded] = useState(false);

  const subtotal = cart ? parseFloat(cart.cost.subtotalAmount.amount) : 0;

  return (
    <div
      className={`fixed inset-0 z-[200] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeCart}
      />
      <div
        className={`absolute right-0 top-0 flex h-full w-full max-w-[420px] flex-col bg-white p-6 transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-heading text-xl text-plum">Your Cart</h3>
          <button type="button" onClick={closeCart} className="text-2xl text-charcoal" aria-label="Close cart">
            ×
          </button>
        </div>

        {!cart || cart.lines.length === 0 ? (
          <p className="py-8 text-center text-taupe-dark">Your cart is empty.</p>
        ) : (
          <>
            <FreeShippingBar subtotal={subtotal} />
            <div className="flex-1 overflow-y-auto">
              {cart.lines.map((line) => (
                <div key={line.id} className="flex gap-4 border-b border-plum/10 py-4">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-rose">
                    {line.merchandise.image?.url ? (
                      <Image
                        src={line.merchandise.image.url}
                        alt={line.merchandise.product.title}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[0.5rem] uppercase text-plum/40">
                        Photo
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{line.merchandise.product.title}</p>
                    <p className="text-sm text-taupe-dark">{line.merchandise.title}</p>
                    <p className="mt-1 font-bold">
                      {formatMoney(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                    </p>
                    <div className="mt-2 flex items-center gap-3">
                      <div className="flex items-center rounded-full border border-plum/15">
                        <button
                          type="button"
                          onClick={() => updateLine(line.id, Math.max(1, line.quantity - 1))}
                          className="px-2.5 py-1 text-sm"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-2 text-sm font-medium">{line.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateLine(line.id, line.quantity + 1)}
                          className="px-2.5 py-1 text-sm"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.id)}
                        className="text-xs text-caption underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* In-cart upsell */}
              {!upsellAdded && cart.lines.length === 1 && (
                <div className="mt-4 rounded-xl border border-dashed border-coral/40 bg-coral/5 p-4">
                  <p className="text-sm font-semibold text-plum">{cartUpsell.label}</p>
                  <p className="mt-1 text-xs text-taupe-dark">{cartUpsell.description}</p>
                  <button
                    type="button"
                    onClick={() => {
                      const secondVariant = cart.lines[0]?.merchandise.id;
                      if (secondVariant) {
                        addItem(secondVariant, 1);
                        setUpsellAdded(true);
                      }
                    }}
                    className="mt-3 text-sm font-semibold text-coral underline"
                  >
                    Add for ${cartUpsell.price} →
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        <div className="mt-4 rounded-xl bg-cream p-4 text-center text-sm text-taupe-dark">
          🔁 Covered by our 30-Night Comfort Guarantee — love it or your money back.
        </div>

        <div className="mt-auto border-t border-plum/10 pt-4">
          <div className="mb-4 flex justify-between text-lg font-bold">
            <span>Subtotal</span>
            <span>
              {cart
                ? formatMoney(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)
                : "$0"}
            </span>
          </div>
          <button
            type="button"
            onClick={checkout}
            disabled={!cart?.lines.length || isLoading}
            className="btn-primary btn-full disabled:opacity-50"
          >
            Checkout →
          </button>
          <PaymentIcons className="mt-4" />
          <p className="mt-3 text-center text-xs text-caption">
            Free USA shipping on orders over ${siteConfig.freeShippingThreshold}
          </p>
        </div>
      </div>
    </div>
  );
}
