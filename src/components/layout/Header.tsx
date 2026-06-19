"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DEFAULT_HANDLE } from "@/lib/shopify";

const nav = [
  { href: `#features`, label: "Features" },
  { href: `#how-it-works`, label: "How It Works" },
  { href: `#reviews`, label: "Reviews" },
  { href: `#faq`, label: "FAQ" },
];

export function Header() {
  const { cart, openCart, justAdded } = useCart();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={cn(
        "fixed top-9 z-[100] w-full transition-all duration-500",
        scrolled
          ? "border-b border-plum/10 bg-cream/90 shadow-[0_4px_30px_rgba(26,18,22,0.06)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="container-wide flex h-[72px] items-center justify-between md:h-20">
        <Link
          href="/"
          className={cn(
            "font-heading text-xl tracking-wide transition-colors md:text-2xl",
            scrolled ? "text-ink" : "text-white"
          )}
        >
          Nova Triggers
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-coral",
                    scrolled ? "text-charcoal" : "text-white/80 hover:text-white"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            variant={scrolled ? "default" : "secondary"}
            className="hidden sm:inline-flex"
          >
            <Link href={`/products/${DEFAULT_HANDLE}`}>Shop Now</Link>
          </Button>

          <button
            type="button"
            onClick={openCart}
            className={cn(
              "relative rounded-full p-2.5 transition-colors",
              scrolled ? "text-plum hover:bg-plum/5" : "text-white hover:bg-white/10"
            )}
            aria-label="Open cart"
          >
            <ShoppingBag className="h-5 w-5" />
            {cart && cart.totalQuantity > 0 && (
              <span
                className={cn(
                  "absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-coral px-1 text-[0.625rem] font-bold text-white",
                  justAdded && "cart-bounce"
                )}
              >
                {cart.totalQuantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
