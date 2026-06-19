"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Cart } from "@/lib/shopify/types";

type CartContextValue = {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  justAdded: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<void>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
  checkout: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const CART_COOKIE = "nova_cart_id";

function getCartIdFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${CART_COOKIE}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCartIdCookie(cartId: string) {
  document.cookie = `${CART_COOKIE}=${encodeURIComponent(cartId)}; path=/; max-age=${60 * 60 * 24 * 14}; SameSite=Lax`;
}

async function cartFetch(body: Record<string, unknown>) {
  const res = await fetch("/api/cart", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Cart request failed");
  return res.json() as Promise<{ cart: Cart | null; error?: string }>;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const refreshCart = useCallback(async (cartId: string) => {
    const data = await cartFetch({ action: "get", cartId });
    if (data.cart) setCart(data.cart);
  }, []);

  useEffect(() => {
    const cartId = getCartIdFromCookie();
    if (cartId) refreshCart(cartId).catch(() => undefined);
  }, [refreshCart]);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    setIsLoading(true);
    try {
      const cartId = getCartIdFromCookie();
      const data = await cartFetch({
        action: cartId ? "add" : "create",
        cartId,
        variantId,
        quantity,
      });
      if (data.cart) {
        setCart(data.cart);
        setCartIdCookie(data.cart.id);
        setJustAdded(true);
        setIsOpen(true);
        setTimeout(() => setJustAdded(false), 600);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateLine = useCallback(async (lineId: string, quantity: number) => {
    const cartId = getCartIdFromCookie();
    if (!cartId) return;
    setIsLoading(true);
    try {
      const data = await cartFetch({ action: "update", cartId, lineId, quantity });
      if (data.cart) setCart(data.cart);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeLine = useCallback(async (lineId: string) => {
    const cartId = getCartIdFromCookie();
    if (!cartId) return;
    setIsLoading(true);
    try {
      const data = await cartFetch({ action: "remove", cartId, lineIds: [lineId] });
      if (data.cart) setCart(data.cart);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const checkout = useCallback(() => {
    if (cart?.checkoutUrl) window.location.href = cart.checkoutUrl;
  }, [cart]);

  const value = useMemo(
    () => ({
      cart,
      isOpen,
      isLoading,
      justAdded,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      updateLine,
      removeLine,
      checkout,
    }),
    [cart, isOpen, isLoading, justAdded, addItem, updateLine, removeLine, checkout]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
