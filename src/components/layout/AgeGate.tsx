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
      className="fixed inset-0 z-[250] flex items-center justify-center bg-black/75 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-gate-title"
    >
      <div className="w-full max-w-lg rounded-2xl bg-white px-6 py-10 text-center shadow-2xl md:px-12 md:py-12">
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo/bowlz-icon.svg"
            alt="bowlz"
            width={80}
            height={80}
            className="h-16 w-16 md:h-20 md:w-20"
            priority
          />
        </div>

        <h2
          id="age-gate-title"
          className="mb-2 text-2xl font-semibold tracking-wide text-ink md:text-[1.75rem]"
        >
          Are you 21+?
        </h2>
        <p className="mb-8 text-sm text-muted md:text-base">(we have to ask 😉)</p>

        <div className="mx-auto flex max-w-sm gap-3">
          <button
            type="button"
            onClick={verify}
            className="btn-pill btn-pill-outline flex-1 border-black/20 px-8"
          >
            Yes
          </button>
          <Link
            href="https://www.google.com"
            className="btn-pill btn-pill-outline flex-1 border-black/20 px-8"
          >
            No
          </Link>
        </div>

        <p className="mx-auto mt-8 max-w-sm text-[0.6875rem] leading-relaxed text-muted">
          By entering this site you are agreeing to the{" "}
          <a
            href="https://bowlzofficial.com/policies/terms-of-service"
            className="underline underline-offset-2 hover:text-ink"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Use
          </a>{" "}
          and{" "}
          <Link href="/policies/privacy-policy" className="underline underline-offset-2 hover:text-ink">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
