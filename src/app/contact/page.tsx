import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { siteConfig } from "@/data/content";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with the ${siteConfig.name} team for orders, support, and wholesale questions.`,
};

export default function ContactPage() {
  return (
    <>
      <div className="bg-white pt-24 pb-6 md:pt-28 md:pb-8">
        <div className="container-main">
          <h1 className="shop-section-title">Contact</h1>
          <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">
            Questions about your order, products, or wholesale? Reach out and our
            team will get back to you.
          </p>
        </div>
      </div>
      <section className="bg-cream py-12 md:py-16">
        <div className="container-main">
          <ContactForm />
          <div className="mx-auto mt-8 max-w-3xl text-center text-sm text-muted">
            <p>
              Email:{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-medium text-ink underline-offset-2 hover:underline"
              >
                {siteConfig.email}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
