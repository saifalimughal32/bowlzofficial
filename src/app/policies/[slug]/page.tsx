import type { Metadata } from "next";
import Link from "next/link";
import { productPolicies } from "@/data/content";
import { siteConfig } from "@/data/content";

type Props = { params: Promise<{ slug: string }> };

const SLUG_MAP: Record<string, string> = {
  "shipping-policy": "Shipping Info",
  "refund-policy": "Returns",
  "warranty-policy": "Warranty & Exchanges",
  "privacy-policy": "Privacy Policy",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const title = SLUG_MAP[slug] ?? "Policy";
  return { title: `${title} Policy` };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const title = SLUG_MAP[slug];
  const policy = productPolicies.find((p) => p.title === title);

  if (!policy) {
    return (
      <div className="bg-white pt-24 pb-16 md:pt-28">
        <div className="container-main max-w-3xl">
          <h1 className="shop-section-title mb-4">Policy not found</h1>
          <Link href="/" className="text-sm text-brand underline-offset-2 hover:underline">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white pt-24 pb-16 md:pt-28 md:pb-20">
      <div className="container-main max-w-3xl">
        <nav className="mb-6 text-sm text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{policy.title}</span>
        </nav>
        <h1 className="shop-section-title mb-8">{policy.title}</h1>
        <div className="prose-policy text-sm leading-relaxed whitespace-pre-line text-muted md:text-base">
          {policy.body}
        </div>
        <p className="mt-10 text-sm text-muted">
          Questions?{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-medium text-ink underline-offset-2 hover:underline"
          >
            {siteConfig.email}
          </a>
        </p>
      </div>
    </div>
  );
}
