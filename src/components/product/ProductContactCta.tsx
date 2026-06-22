import Link from "next/link";
import { siteConfig } from "@/data/content";

export function ProductContactCta() {
  return (
    <section className="border-t border-black/8 bg-white py-10 md:py-12">
      <div className="container-main max-w-3xl text-center">
        <h2 className="mb-2 text-lg font-bold text-ink md:text-xl">Ask a question</h2>
        <p className="mb-6 text-sm text-muted">
          Need help choosing a size, color, or wholesale order? Our team is here to help.
        </p>
        <Link href="/contact" className="btn-pill btn-pill-brand">
          Contact Us
        </Link>
        <p className="mt-4 text-sm text-muted">
          or email{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-medium text-ink underline-offset-2 hover:underline"
          >
            {siteConfig.email}
          </a>
        </p>
      </div>
    </section>
  );
}
