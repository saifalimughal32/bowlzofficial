"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/data/content";

const COUNTRIES = [
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
  "Mexico",
  "Germany",
  "France",
  "Other",
];

const PHONE_COUNTRIES = [
  { code: "US", flag: "🇺🇸", dialCode: "+1", name: "United States" },
  { code: "CA", flag: "🇨🇦", dialCode: "+1", name: "Canada" },
  { code: "GB", flag: "🇬🇧", dialCode: "+44", name: "United Kingdom" },
  { code: "AU", flag: "🇦🇺", dialCode: "+61", name: "Australia" },
  { code: "MX", flag: "🇲🇽", dialCode: "+52", name: "Mexico" },
  { code: "DE", flag: "🇩🇪", dialCode: "+49", name: "Germany" },
  { code: "FR", flag: "🇫🇷", dialCode: "+33", name: "France" },
  { code: "ES", flag: "🇪🇸", dialCode: "+34", name: "Spain" },
  { code: "IT", flag: "🇮🇹", dialCode: "+39", name: "Italy" },
  { code: "NL", flag: "🇳🇱", dialCode: "+31", name: "Netherlands" },
  { code: "JP", flag: "🇯🇵", dialCode: "+81", name: "Japan" },
  { code: "IN", flag: "🇮🇳", dialCode: "+91", name: "India" },
] as const;

const CONTACT_METHODS = ["Email", "Phone", "Text"];

export function WholesaleContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [phoneCountryCode, setPhoneCountryCode] = useState<(typeof PHONE_COUNTRIES)[number]["code"]>("US");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    const phoneCountry =
      PHONE_COUNTRIES.find((country) => country.code === data.get("phoneCountry")) ??
      PHONE_COUNTRIES[0];
    const phoneLocal = String(data.get("phone") ?? "").trim();
    const fullPhone = phoneLocal ? `${phoneCountry.dialCode} ${phoneLocal}` : "—";

    const lines = [
      `Name/Shop: ${data.get("nameShop")}`,
      `Tax ID/EIN: ${data.get("taxId") || "—"}`,
      `Email: ${data.get("email")}`,
      `Phone: ${fullPhone}`,
      `Country: ${data.get("country")}`,
      `Address: ${data.get("address")}`,
      `City: ${data.get("city")}`,
      `Postal code: ${data.get("postalCode")}`,
      `Preferred contact: ${data.get("contactMethod")}`,
      "",
      String(data.get("message") ?? ""),
    ];

    const body = encodeURIComponent(lines.join("\n"));
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Wholesale Contact Form")}&body=${body}`;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p className="rounded-xl bg-brand/10 px-4 py-4 text-center text-sm font-medium text-brand">
        Thanks — your email client should open with your wholesale inquiry.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="wholesale-name-shop" className="form-label">
          Name/Shop<span className="text-red-600">*</span>
        </label>
        <input
          id="wholesale-name-shop"
          name="nameShop"
          type="text"
          required
          className="form-input"
        />
      </div>

      <div>
        <label htmlFor="wholesale-tax-id" className="form-label">
          Tax ID/EIN
        </label>
        <input id="wholesale-tax-id" name="taxId" type="text" className="form-input" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="wholesale-email" className="form-label">
            Email<span className="text-red-600">*</span>
          </label>
          <input
            id="wholesale-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="wholesale-phone" className="form-label">
            Phone<span className="text-red-600">*</span>
          </label>
          <div className="flex overflow-hidden rounded-xl border border-black/10 bg-white focus-within:border-brand focus-within:ring-2 focus-within:ring-brand/15">
            <label
              htmlFor="wholesale-phone-country"
              className="flex shrink-0 items-center border-r border-black/10 pl-3 pr-2"
            >
              <select
                id="wholesale-phone-country"
                name="phoneCountry"
                value={phoneCountryCode}
                onChange={(e) =>
                  setPhoneCountryCode(e.target.value as (typeof PHONE_COUNTRIES)[number]["code"])
                }
                className="max-w-[6.5rem] cursor-pointer appearance-none border-0 bg-transparent py-3 text-sm text-muted outline-none"
                aria-label="Phone country code"
              >
                {PHONE_COUNTRIES.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.flag} {country.dialCode}
                  </option>
                ))}
              </select>
            </label>
            <input
              id="wholesale-phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-base text-ink outline-none"
              placeholder="(555) 000-0000"
            />
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="wholesale-country" className="form-label">
          Country
        </label>
        <select id="wholesale-country" name="country" className="form-input" defaultValue="United States">
          {COUNTRIES.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="wholesale-address" className="form-label">
          Address
        </label>
        <input id="wholesale-address" name="address" type="text" className="form-input" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="wholesale-city" className="form-label">
            City
          </label>
          <input id="wholesale-city" name="city" type="text" className="form-input" />
        </div>
        <div>
          <label htmlFor="wholesale-postal" className="form-label">
            Postal code
          </label>
          <input id="wholesale-postal" name="postalCode" type="text" className="form-input" />
        </div>
      </div>

      <div>
        <label htmlFor="wholesale-contact-method" className="form-label">
          Preferred Method of contact<span className="text-red-600">*</span>
        </label>
        <select id="wholesale-contact-method" name="contactMethod" required className="form-input">
          <option value="">Select one</option>
          {CONTACT_METHODS.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="wholesale-message" className="form-label">
          Message
        </label>
        <textarea
          id="wholesale-message"
          name="message"
          rows={6}
          className="form-input form-textarea"
        />
      </div>

      <div className="pt-1">
        <button type="submit" className="btn-pill btn-pill-brand min-w-[140px]">
          Submit
        </button>
      </div>
    </form>
  );
}
