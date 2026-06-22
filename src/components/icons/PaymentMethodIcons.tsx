import type { ReactNode } from "react";

type IconProps = { className?: string };

function CardFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 38 24"
      className={`h-6 w-[2.375rem] shrink-0 ${className}`}
      role="img"
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function VisaIcon({ className }: IconProps) {
  return (
    <CardFrame className={className}>
      <title>Visa</title>
      <rect width="38" height="24" rx="3" fill="#fff" stroke="#E6E6E6" />
      <path
        fill="#1434CB"
        d="M16.2 15.9h-2.4l1.5-9h2.3l-1.4 9zm9.9-8.7c-.5-.2-1.3-.4-2.2-.4-2.4 0-4 1.2-4 3.1 0 1.3 1.2 2.1 2.1 2.6.9.5 1.3.8 1.3 1.3 0 .7-.8 1.1-1.5 1.1-.9 0-1.5-.1-2.3-.5l-.4-.2-.3 2c.6.2 1.5.4 2.5.4 2.6 0 4.2-1.2 4.2-3.2 0-1.1-.7-1.9-2.1-2.6-.9-.4-1.4-.7-1.4-1.2 0-.4.4-.8 1.4-.8.8 0 1.4.2 1.8.4l.2.1.3-2zm3.4 8.7h2.2l-1.7-9h-2c-.6 0-1.1.2-1.3.8l-3.7 8.2h2.5l.5-1.4h3.2l.3 1.4zm-3.4-3.3l1.3-3.6.8 3.6h-2.1zM9.2 6.9L7.4 15.9H5l2.2-9h2zm-1.6 0L5.1 12 4.5 7.8C4.3 7.1 3.8 6.9 3.2 6.9H0l.1.3c.9.2 1.8.6 2.2 1.2l2.6 7.5h2.5l4-9h-2.2z"
      />
    </CardFrame>
  );
}

export function MastercardIcon({ className }: IconProps) {
  return (
    <CardFrame className={className}>
      <title>Mastercard</title>
      <rect width="38" height="24" rx="3" fill="#fff" stroke="#E6E6E6" />
      <circle cx="15" cy="12" r="6.2" fill="#EB001B" />
      <circle cx="23" cy="12" r="6.2" fill="#F79E1B" />
      <path
        fill="#FF5F00"
        d="M19 8.2a6.2 6.2 0 0 0-2.4 4.8 6.2 6.2 0 0 0 2.4 4.8 6.2 6.2 0 0 0 2.4-4.8 6.2 6.2 0 0 0-2.4-4.8z"
      />
    </CardFrame>
  );
}

export function AmexIcon({ className }: IconProps) {
  return (
    <CardFrame className={className}>
      <title>American Express</title>
      <rect width="38" height="24" rx="3" fill="#016FD0" />
      <path
        fill="#fff"
        d="M6.8 16.2 8.2 13h.1l1.2 3.2h1.4l-2.1-4.7 2-4.7H9.4L8.3 10l-.1.3-.1-.3H6.5l2 4.7-2 4.7h1.3zm5.8 0h1.4V7.5h-1.4v8.7zm4.5-4.4-1.6 4.4h-1.5l1.6-4.4-1.5-4.3h1.5l1 3 .1.3.1-.3 1-3h1.5l-1.5 4.3zm6.2 4.4h2.8l-2.1-4.7 2.1-4.7h-2.7l-1.1 2.8-.1.3-.1-.3-1.1-2.8h-2.7l2.1 4.7-2.1 4.7h2.7l1.1-2.9.1-.3.1.3 1 2.9zM28.8 7.5h-3.5c-.7 0-1.2.4-1.4 1l-2.8 7.7h1.6l.6-1.6h3.1l.3 1.6h1.5l-1.8-8.7zm-3.1 5.2 1.3-3.4.7 3.4h-2z"
      />
    </CardFrame>
  );
}

export function PayPalIcon({ className }: IconProps) {
  return (
    <CardFrame className={className}>
      <title>PayPal</title>
      <rect width="38" height="24" rx="3" fill="#fff" stroke="#E6E6E6" />
      <path
        fill="#003087"
        d="M14.2 7.2h3.4c2.1 0 3.4 1.2 3.1 3-.3 1.6-1.7 2.7-3.6 2.7h-1.6l-.5 2.8h-1.9l1.1-8.5zm2 4.4h1.2c1.1 0 1.7-.5 1.9-1.4.2-.8-.3-1.3-1.3-1.3h-1.2l-.6 2.7z"
      />
      <path
        fill="#009CDE"
        d="M22.6 7.2h3.3c2.1 0 3.4 1.2 3.1 3-.3 1.6-1.7 2.7-3.6 2.7h-1.6l-.5 2.8H21l1.1-8.5zm2 4.4h1.2c1.1 0 1.7-.5 1.9-1.4.2-.8-.3-1.3-1.3-1.3h-1.2l-.6 2.7z"
      />
      <path
        fill="#012169"
        d="M12.1 7.2H9.3c-.5 0-.9.3-1 .8L6.8 16.5h1.9l.4-2.4h1.6c2.3 0 3.7-1.1 4-2.9.2-1.2-.1-2-1.2-2.5-.3-.2-.8-.3-1.4-.5z"
      />
    </CardFrame>
  );
}

export function ShopPayIcon({ className }: IconProps) {
  return (
    <CardFrame className={className}>
      <title>Shop Pay</title>
      <rect width="38" height="24" rx="3" fill="#5A31F4" />
      <path
        fill="#fff"
        d="M8.6 8.1c0-.6.5-1 1.2-1 1.1 0 2.4.4 3.4 1 .1.1.3 0 .3-.2V7.2c0-.1-.1-.2-.2-.3-1.2-.6-2.5-.9-3.8-.9-3 0-5 1.6-5 4.2 0 4 5.6 3.4 5.6 6.1 0 .6-.5 1.1-1.3 1.1-1.2 0-2.7-.5-3.7-1.2-.2-.1-.4 0-.4.2v1.3c0 .1.1.2.2.3 1.3.7 2.7 1.1 4.1 1.1 3.2 0 5.2-1.6 5.2-4.2 0-4.4-5.8-3.6-5.8-6.6z"
      />
      <path
        fill="#fff"
        d="M17.8 7h-2.1c-.2 0-.4.1-.4.4l-1.8 11.2c0 .2.1.4.4.4h2.1c.2 0 .4-.1.4-.4l.6-3.8h1.8c3.4 0 5.4-1.7 5.9-4.2.3-1.2.1-2.1-.5-2.8-.7-.8-1.9-1.3-3.5-1.3h-1.6l.3-1.5zm.7 4.2h1.4c1.4 0 2.2.7 2 2-.2 1.3-1.3 2-2.8 2h-1.4l.8-4zm8.8-4h-2c-.2 0-.4.1-.5.4l-2.7 11.2c-.1.2 0 .4.3.4h1.9c.2 0 .4-.1.5-.3l.8-2.6h2.1c3 0 4.8-1.5 5.3-3.8.3-1.1.1-2-.5-2.6-.6-.7-1.6-1.1-2.9-1.1h-1.7l.4-1.2zm-.3 4.2h1.3c1.3 0 2.1.6 1.9 1.9-.2 1.2-1.2 1.9-2.6 1.9h-1.3l.7-3.8z"
      />
    </CardFrame>
  );
}

export function ApplePayIcon({ className }: IconProps) {
  return (
    <CardFrame className={className}>
      <title>Apple Pay</title>
      <rect width="38" height="24" rx="3" fill="#000" />
      <path
        fill="#fff"
        d="M10.1 7.6c-.6.7-1.5 1.3-2.4 1.2-.1-.9.3-1.8.8-2.4.6-.7 1.6-1.2 2.4-1.3.1.9-.3 1.8-.8 2.5zm.7 1.1c-1.3-.1-2.4.8-3-.8-.7-.1-1.6-.7-2.6-.7-1.4 0-2.7.8-3.4 2.1-1 1.7-.8 4.2.7 6.4.6.9 1.4 2 2.5 2 .9 0 1.3-.6 2.5-.6 1.2 0 1.5.6 2.5.6 1.1 0 1.8-1 2.4-1.9.8-1.1 1.1-2.2 1.1-2.3-.1 0-2.4-1-2.4-3.7 0-2.2 1.8-3.2 1.9-3.3-1.1-.8-2.6-1.2-3.1-1.2z"
      />
      <path
        fill="#fff"
        d="M18.5 8.3h.9l1.1 4.3 1.1-4.3h.9v5.6h-.8V9.5l-1.2 3.9h-.6l-1.2-4v4h-.8V8.3zm5.7 0c1 0 1.6.5 1.6 1.4 0 .6-.4 1-1 1.2l1.2 1.8h-1l-1.1-1.7h-.7v1.7h-.8V8.3h1.8zm0 2.2c.5 0 .8-.2.8-.7 0-.4-.3-.7-.8-.7h-.9v1.4h.9zm2.9-2.2h1.8c1.1 0 1.8.6 1.8 1.5 0 .9-.7 1.5-1.8 1.5h-1v2.5h-.8V8.3zm1.8 2.4c.6 0 1-.3 1-.9 0-.6-.4-.9-1-.9h-1v1.8h1z"
      />
    </CardFrame>
  );
}

export const PAYMENT_METHODS = [
  { id: "visa", Icon: VisaIcon, label: "Visa" },
  { id: "mastercard", Icon: MastercardIcon, label: "Mastercard" },
  { id: "amex", Icon: AmexIcon, label: "American Express" },
  { id: "paypal", Icon: PayPalIcon, label: "PayPal" },
  { id: "shop-pay", Icon: ShopPayIcon, label: "Shop Pay" },
  { id: "apple-pay", Icon: ApplePayIcon, label: "Apple Pay" },
] as const;
