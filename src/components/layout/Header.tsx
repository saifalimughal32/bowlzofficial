"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Search, User, X } from "lucide-react";
import { mainNav, type NavItem } from "@/data/content";
import { useCart } from "@/components/cart/CartProvider";
import { HomePromoBar } from "@/components/home/HomePromoBar";
import { CartIcon } from "@/components/icons/CartIcon";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

function hasChildren(item: NavItem): item is NavItem & { children: { href: string; label: string }[] } {
  return "children" in item && Array.isArray(item.children);
}

function DesktopNavLink({
  item,
  navSolid,
  onNavigate,
}: {
  item: NavItem;
  navSolid: boolean;
  onNavigate?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (!hasChildren(item)) {
    const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

    return (
      <Link
        href={item.href}
        onClick={onNavigate}
        className={cn(
          "nav-link",
          navSolid ? "nav-link-dark" : "nav-link-light",
          isActive && "opacity-100 underline underline-offset-4"
        )}
      >
        {item.label}
      </Link>
    );
  }

  const isShopActive = pathname.startsWith("/shop");

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={item.href}
        className={cn(
          "nav-link inline-flex items-center gap-1",
          navSolid ? "nav-link-dark" : "nav-link-light",
          isShopActive && "opacity-100 underline underline-offset-4"
        )}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={onNavigate}
      >
        {item.label}
        <ChevronDown
          size={14}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </Link>

      <div
        className={cn(
          "absolute left-1/2 top-full z-50 min-w-[11rem] -translate-x-1/2 pt-3 transition-all duration-200",
          open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-1 opacity-0"
        )}
      >
        <ul className="overflow-hidden rounded-xl border border-black/8 bg-white py-2 shadow-lg">
          {item.children.map((child) => (
            <li key={child.href}>
              <Link
                href={child.href}
                onClick={() => {
                  setOpen(false);
                  onNavigate?.();
                }}
                className="block px-4 py-2.5 text-sm text-ink transition-colors hover:bg-black/5"
              >
                {child.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const { openCart, cart } = useCart();
  const itemCount = cart?.totalQuantity ?? 0;
  const pathname = usePathname();

  const isShopRoute = pathname.startsWith("/shop");
  const isStaticHeader =
    isShopRoute || pathname === "/wholesale" || pathname === "/contact";
  const navSolid = scrolled || menuOpen || isStaticHeader;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setShopOpen(false);
  }, [pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      <HomePromoBar />
      <div
        className={cn(
          "transition-colors duration-300",
          navSolid ? "bg-white shadow-sm" : "bg-transparent"
        )}
      >
        <div className="container-main relative flex h-14 items-center justify-between md:h-[4.5rem]">
          <Logo
            variant={navSolid ? "dark" : "light"}
            priority
            onClick={closeMenu}
          />

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 md:flex lg:gap-8">
            {mainNav.map((item) => (
              <DesktopNavLink key={item.label} item={item} navSolid={navSolid} />
            ))}
          </nav>

          <div className="flex items-center gap-1 md:gap-2">
            <Link
              href="/wholesale"
              className={cn(
                "hidden h-10 w-10 items-center justify-center rounded-full transition-colors sm:flex md:h-11 md:w-11",
                navSolid ? "text-ink hover:bg-black/5" : "text-white hover:bg-white/10"
              )}
              aria-label="Wholesale account"
            >
              <User size={20} strokeWidth={1.75} />
            </Link>

            <Link
              href="/shop"
              className={cn(
                "hidden h-10 w-10 items-center justify-center rounded-full transition-colors sm:flex md:h-11 md:w-11",
                navSolid ? "text-ink hover:bg-black/5" : "text-white hover:bg-white/10"
              )}
              aria-label="Search products"
            >
              <Search size={20} strokeWidth={1.75} />
            </Link>

            <button
              type="button"
              onClick={openCart}
              className={cn(
                "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-200 md:h-11 md:w-11",
                navSolid
                  ? "text-ink hover:bg-black/5"
                  : "text-white hover:bg-white/10"
              )}
              aria-label={`Cart (${itemCount} items)`}
            >
              <CartIcon size={20} />
              {itemCount > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand px-1 text-[9px] font-bold text-white">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors md:hidden",
                navSolid ? "text-ink hover:bg-black/5" : "text-white hover:bg-white/10"
              )}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-[5.75rem] z-[99] overflow-y-auto bg-white transition-transform duration-300 ease-out md:hidden",
          menuOpen ? "translate-x-0" : "pointer-events-none translate-x-full"
        )}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col gap-1 px-5 py-6">
          {mainNav.map((item) => {
            if (!hasChildren(item)) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-black/5"
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div key={item.label} className="rounded-xl">
                <button
                  type="button"
                  onClick={() => setShopOpen((o) => !o)}
                  className="flex w-full items-center justify-between px-4 py-3.5 text-base font-semibold text-ink transition-colors hover:bg-black/5"
                  aria-expanded={shopOpen}
                >
                  {item.label}
                  <ChevronDown
                    size={18}
                    className={cn("transition-transform", shopOpen && "rotate-180")}
                  />
                </button>
                {shopOpen && (
                  <div className="pb-2 pl-4">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeMenu}
                        className="block rounded-lg px-4 py-2.5 text-sm text-muted transition-colors hover:bg-black/5 hover:text-ink"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
