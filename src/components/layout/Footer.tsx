import Link from "next/link";
import { siteConfig } from "@/data/content";
import { PaymentIcons } from "@/components/ui/PaymentIcons";

export function Footer() {
  return (
    <footer className="border-t border-plum/10 bg-ink px-5 py-16 text-white/70">
      <div className="container-wide">
        <div className="mb-12 grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4 font-heading text-2xl text-white">Nova Triggers</div>
            <p className="max-w-sm leading-relaxed">
              Heated menstrual relief belt — instant warmth and gentle vibration for every
              day of your cycle. Designed for comfort, built for your real life.
            </p>
            <div className="mt-6 opacity-80">
              <PaymentIcons />
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Shop
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/products/${siteConfig.productHandle}`} className="hover:text-white">
                  Heating Belt
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-white">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Support
            </h4>
            <a href={`mailto:${siteConfig.email}`} className="text-sm hover:text-white">
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="feature-line mb-8" />

        <p className="text-xs leading-relaxed opacity-50">
          Nova Triggers is a personal comfort product, not a medical device. It is not
          intended to diagnose, treat, cure, or prevent any condition. Consult your
          healthcare provider for medical concerns. © {new Date().getFullYear()}{" "}
          {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
