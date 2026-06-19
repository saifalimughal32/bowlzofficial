export function PaymentIcons({ className = "" }: { className?: string }) {
  const methods = [
    { label: "Visa", w: 36 },
    { label: "MC", w: 36 },
    { label: "Amex", w: 36 },
    { label: "PayPal", w: 48 },
    { label: "Shop Pay", w: 52 },
    { label: "Apple Pay", w: 44 },
  ];

  return (
    <div className={`flex flex-wrap items-center justify-center gap-2 ${className}`}>
      {methods.map((m) => (
        <span
          key={m.label}
          className="flex h-7 items-center justify-center rounded-md border border-plum/10 bg-white px-2 text-[0.625rem] font-semibold uppercase tracking-wide text-taupe-dark"
          style={{ minWidth: m.w }}
        >
          {m.label}
        </span>
      ))}
    </div>
  );
}

export function TrustStrip({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-x-5 gap-y-2 ${compact ? "text-xs" : "text-sm"} text-taupe-dark`}>
      <span className="flex items-center gap-1.5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-plum">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
        Secure checkout
      </span>
      <span className="flex items-center gap-1.5">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-plum">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        30-Night Guarantee
      </span>
      <span className="flex items-center gap-1.5">
        <span aria-hidden>🇺🇸</span>
        Ships from USA
      </span>
    </div>
  );
}
