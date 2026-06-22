"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { HomeSection } from "@/components/home/HomeSection";
import { siteConfig } from "@/data/content";

export function HomeWholesale() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const store = String(data.get("store") ?? "");
    const message = String(data.get("message") ?? "");

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nStore: ${store}\n\n${message}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Wholesale Inquiry")}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <HomeSection id="wholesale" tight>
      <div className="container-main">
        <div className="mx-auto max-w-3xl rounded-[var(--radius-banner)] bg-white p-6 ring-1 ring-black/[0.06] md:p-10 lg:p-12">
          <div className="mb-8 text-center md:mb-10">
            <h2 className="hero-headline mb-4 text-ink md:text-[2.25rem]">
              Got a Smokeshop or Dispensary?
            </h2>
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted md:text-base">
              Join retailers nationwide carrying Bowlz magnetic bowls and Bongz
              glass. Wholesale pricing, fast fulfillment, and display-ready
              packaging.
            </p>
          </div>

          {submitted ? (
            <p className="rounded-xl bg-brand/10 px-4 py-3 text-center text-sm font-medium text-brand">
              Thanks — your email client should open shortly. You can also{" "}
              <Link
                href="https://bowlzofficial.com/pages/wholesale"
                className="underline underline-offset-2"
              >
                create a wholesale account
              </Link>
              .
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="wholesale-name" className="form-label">
                    Name
                  </label>
                  <input
                    id="wholesale-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className="form-input"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="wholesale-email" className="form-label">
                    Email
                  </label>
                  <input
                    id="wholesale-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="form-input"
                    placeholder="you@store.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="wholesale-store" className="form-label">
                  Store Name
                </label>
                <input
                  id="wholesale-store"
                  name="store"
                  type="text"
                  required
                  className="form-input"
                  placeholder="Your shop or dispensary"
                />
              </div>
              <div>
                <label htmlFor="wholesale-message" className="form-label">
                  Message
                </label>
                <textarea
                  id="wholesale-message"
                  name="message"
                  rows={4}
                  className="form-input form-textarea"
                  placeholder="Tell us about your store and what you're interested in carrying."
                />
              </div>
              <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <button type="submit" className="btn-pill btn-pill-brand w-full sm:w-auto">
                  Send Inquiry
                </button>
                <Link
                  href="/wholesale"
                  className="btn-pill btn-pill-outline w-full text-center sm:w-auto"
                >
                  Create Wholesale Account
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </HomeSection>
  );
}
