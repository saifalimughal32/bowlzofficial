"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { siteConfig } from "@/data/content";

export function Header() {
  const { cart, openCart, justAdded } = useCart();

  return (
    <header className="sticky top-0 z-[100] h-[72px] border-b border-plum/10 bg-cream/95 backdrop-blur-md">
      <div className="container-main flex h-full items-center justify-between">
        <Link
          href="/"
          className="font-heading text-[1.375rem] font-semibold uppercase tracking-wider text-plum"
        >
          Nova Triggers
        </Link>

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex gap-8">
            <li>
              <Link href={`/products/${siteConfig.productHandle}`} className="text-[0.9375rem] font-medium text-charcoal hover:text-plum">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/#how-it-works" className="text-[0.9375rem] font-medium text-charcoal hover:text-plum">
                How It Works
              </Link>
            </li>
            <li>
              <Link href="/#reviews" className="text-[0.9375rem] font-medium text-charcoal hover:text-plum">
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/#faq" className="text-[0.9375rem] font-medium text-charcoal hover:text-plum">
                FAQ
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={openCart}
          className="relative p-2 text-plum"
          aria-label="Open cart"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cart && cart.totalQuantity > 0 && (
            <span
              className={`absolute right-0 top-0 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-coral text-[0.625rem] font-bold text-white ${justAdded ? "cart-bounce" : ""}`}
            >
              {cart.totalQuantity}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
