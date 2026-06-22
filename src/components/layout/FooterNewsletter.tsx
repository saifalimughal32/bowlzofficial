"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/data/content";

export function FooterNewsletter() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Newsletter Signup")}&body=${encodeURIComponent(`Please add me to the newsletter: ${email}`)}`;
    setSubmitted(true);
  }

  return (
    <section className="border-b border-black/10 bg-white py-12 md:py-16">
      <div className="w-full px-4 md:px-5">
        <div className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
          <div>
            <h2 className="mb-2 text-2xl font-bold text-ink md:text-[1.75rem]">
              Stay in The Know
            </h2>
            <p className="text-sm text-muted md:text-base">
              Join our newsletter for the latest product announcements and sales
            </p>
          </div>

          {submitted ? (
            <p className="text-sm font-medium text-brand md:text-base">
              Thanks for subscribing — check your inbox to confirm.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
              <label htmlFor="footer-email" className="sr-only">
                Email
              </label>
              <input
                id="footer-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="email@example.com"
                className="footer-newsletter-input min-h-[48px] flex-1"
              />
              <button type="submit" className="footer-subscribe-btn shrink-0">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
