"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const STORAGE_KEY = "bowlz_age_verified";

export function AgeGate() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const verified = window.localStorage.getItem(STORAGE_KEY) === "true";
    setVisible(!verified);
    document.body.style.overflow = verified ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  function verify() {
    window.localStorage.setItem(STORAGE_KEY, "true");
    document.body.style.overflow = "";
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[250] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl md:p-10">
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo/bowlz-logo.png"
            alt="bowlz"
            width={483}
            height={138}
            className="h-10 w-auto"
          />
        </div>
        <h2 id="age-gate-title" className="mb-3 text-xl font-bold text-ink md:text-2xl">
          Age Verification
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-muted md:text-base">
          You must be at least <strong className="text-ink">21 years old</strong> to enter
          this site. By entering, you confirm you are of legal age in your location.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={verify}
            className="btn-pill btn-pill-brand w-full sm:min-w-[140px] sm:w-auto"
          >
            I am 21+
          </button>
          <Link
            href="https://www.google.com"
            className="btn-pill btn-pill-outline w-full sm:min-w-[140px] sm:w-auto"
          >
            Exit
          </Link>
        </div>
        <p className="mt-6 text-[0.6875rem] leading-relaxed text-muted">
          Products are intended for legal herbal use only. Please consume responsibly.
        </p>
      </div>
    </div>
  );
}
