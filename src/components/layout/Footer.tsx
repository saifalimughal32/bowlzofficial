import Link from "next/link";
import { siteConfig } from "@/data/content";
import { PaymentIcons } from "@/components/ui/PaymentIcons";

export function Footer() {
  return (
    <footer className="bg-plum px-5 py-12 text-white/85">
      <div className="container-main">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4 font-heading text-xl uppercase tracking-wider text-white">
              Nova Triggers
            </div>
            <p>
              Heated menstrual relief belt — instant warmth and gentle vibration for every day of your cycle. Designed for comfort, built for your real life.
            </p>
            <div className="mt-4">
              <PaymentIcons />
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-sm uppercase tracking-wider text-white">Shop</h4>
            <p>
              <Link href={`/products/${siteConfig.productHandle}`} className="hover:opacity-80">
                Heating Belt
              </Link>
            </p>
            <p>
              <Link href="/#faq" className="hover:opacity-80">
                FAQ
              </Link>
            </p>
            <p>
              <Link href="/#reviews" className="hover:opacity-80">
                Reviews
              </Link>
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm uppercase tracking-wider text-white">Support</h4>
            <p>
              <a href={`mailto:${siteConfig.email}`} className="hover:opacity-80">
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>
        <p className="border-t border-white/15 pt-8 text-xs leading-relaxed opacity-70">
          Nova Triggers is a personal comfort product, not a medical device. It is not
          intended to diagnose, treat, cure, or prevent any condition. Consult your
          healthcare provider for medical concerns. © {new Date().getFullYear()}{" "}
          {siteConfig.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
