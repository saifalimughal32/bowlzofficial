"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { siteConfig } from "@/data/content";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "General Inquiry");
    const message = String(data.get("message") ?? "");

    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-3xl rounded-[var(--radius-banner)] bg-white p-6 ring-1 ring-black/[0.06] md:p-10 lg:p-12">
      {submitted ? (
        <p className="rounded-xl bg-brand/10 px-4 py-3 text-center text-sm font-medium text-brand">
          Thanks — your email client should open shortly. You can also email us at{" "}
          <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-2">
            {siteConfig.email}
          </a>
          .
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="contact-name" className="form-label">
                Name
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="form-input"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="form-label">
                Email
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="form-input"
                placeholder="you@email.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="contact-subject" className="form-label">
              Subject
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              required
              className="form-input"
              placeholder="How can we help?"
            />
          </div>
          <div>
            <label htmlFor="contact-message" className="form-label">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              required
              className="form-input form-textarea"
              placeholder="Tell us what you need."
            />
          </div>
          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
            <button type="submit" className="btn-pill btn-pill-brand w-full sm:w-auto">
              Send Message
            </button>
            <Link
              href="/wholesale"
              className="btn-pill btn-pill-outline w-full text-center sm:w-auto"
            >
              Wholesale Inquiries
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
