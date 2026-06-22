function VisaIcon() {
  return (
    <svg viewBox="0 0 38 24" className="h-6 w-auto" aria-hidden>
      <rect width="38" height="24" rx="3" fill="#fff" stroke="#E5E5E5" />
      <path fill="#1434CB" d="M16.5 15.5h-2.3l1.4-8.5h2.3l-1.4 8.5zm9.8-8.3c-.5-.2-1.2-.4-2.1-.4-2.3 0-3.9 1.2-3.9 3 0 1.3 1.2 2 2.1 2.5.9.5 1.2.8 1.2 1.3 0 .7-.7 1-1.4 1-.9 0-1.4-.1-2.1-.5l-.3-.1-.3 2c.5.2 1.4.4 2.4.4 2.5 0 4.1-1.2 4.1-3.1 0-1-.6-1.8-2-2.5-.8-.4-1.3-.7-1.3-1.2 0-.4.4-.8 1.3-.8.7 0 1.3.2 1.7.3l.2.1.3-1.9zM29 7h-1.8c-.6 0-1 .2-1.2.8l-3.5 7.7h2.5l.5-1.3h3.1l.3 1.3H31l-2-8.5zm-3.2 5.5l1.3-3.5.7 3.5h-2zm-9.2-5.5L14.6 15.5h-2.4L9.8 7h2.3l1.5 7.5L15.1 7h2.2l-2.7 8.5zM8.3 7L6 15.5H3.7L5.5 7h2.8z" />
    </svg>
  );
}

function MastercardIcon() {
  return (
    <svg viewBox="0 0 38 24" className="h-6 w-auto" aria-hidden>
      <rect width="38" height="24" rx="3" fill="#fff" stroke="#E5E5E5" />
      <circle cx="15" cy="12" r="6" fill="#EB001B" />
      <circle cx="23" cy="12" r="6" fill="#F79E1B" fillOpacity=".85" />
    </svg>
  );
}

function AmexIcon() {
  return (
    <svg viewBox="0 0 38 24" className="h-6 w-auto" aria-hidden>
      <rect width="38" height="24" rx="3" fill="#2E77BC" />
      <path fill="#fff" d="M7 16.5l1.2-2.7h.1l1.2 2.7H11l-2-4.5L11 7.5H9.6L8.4 10l-.1.3L7.1 7.5H5.7l2 4.5-2 4.5H7zm6.2 0h1.3V7.5H13.2v9zm4.1-4.5l-1.5 4.5h-1.4l1.5-4.5-1.4-4.5h1.4l1.4 4.5zm5.2 4.5h2.6l-2-4.5 2-4.5h-2.5l-1 2.5-.1.3-.1-.3-1-2.5h-2.5l2 4.5-2 4.5h2.5l1-2.6.1-.3.1.3 1 2.6z" />
    </svg>
  );
}

function PayPalIcon() {
  return (
    <svg viewBox="0 0 38 24" className="h-6 w-auto" aria-hidden>
      <rect width="38" height="24" rx="3" fill="#fff" stroke="#E5E5E5" />
      <path fill="#003087" d="M14.5 7.5h3.2c2 0 3.2 1.1 2.9 2.8-.3 1.5-1.6 2.6-3.4 2.6h-1.5l-.5 2.6h-1.8l1.1-8zm1.9 4.2h1.1c1 0 1.6-.5 1.8-1.3.2-.8-.3-1.3-1.2-1.3h-1.1l-.6 2.6z" />
      <path fill="#009CDE" d="M22.5 7.5h3.1c2 0 3.2 1.1 2.9 2.8-.3 1.5-1.6 2.6-3.4 2.6h-1.5l-.5 2.6H21l1.1-8zm1.9 4.2h1.1c1 0 1.6-.5 1.8-1.3.2-.8-.3-1.3-1.2-1.3h-1.1l-.6 2.6z" />
    </svg>
  );
}

export function PaymentIcons() {
  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Accepted payment methods">
      <VisaIcon />
      <MastercardIcon />
      <AmexIcon />
      <PayPalIcon />
    </div>
  );
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export function SocialIcons({ links }: { links: { href: string; label: string }[] }) {
  return (
    <div className="flex items-center gap-4">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-ink transition-opacity hover:opacity-60"
          aria-label={link.label}
        >
          {link.label === "Facebook" ? <FacebookIcon /> : <InstagramIcon />}
        </a>
      ))}
    </div>
  );
}
