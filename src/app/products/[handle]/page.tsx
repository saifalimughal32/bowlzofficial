import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct } from "@/lib/shopify";
import { ProductBuyBox, ProductGallery } from "@/components/product/ProductBuyBox";
import { TrustStrip, PaymentIcons } from "@/components/ui/PaymentIcons";
import { BeforeAfter } from "@/components/sections/BeforeAfter";
import { VideoDemo } from "@/components/sections/VideoDemo";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Reviews } from "@/components/sections/Reviews";
import { Comparison } from "@/components/sections/Comparison";
import { Guarantee } from "@/components/sections/Guarantee";
import { FAQ } from "@/components/sections/FAQ";

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return { title: "Product not found" };
  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  return (
    <>
      <section className="section pb-12 pt-6 md:pb-16 md:pt-8">
        <div className="container-main">
          <nav className="mb-6 text-sm text-taupe-dark">
            <Link href="/" className="hover:text-plum">
              Home
            </Link>{" "}
            / {product.title}
          </nav>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <ProductGallery product={product} />
            <ProductBuyBox product={product} />
          </div>

          <div className="mt-10 space-y-4 border-y border-plum/10 py-8">
            <TrustStrip />
            <PaymentIcons />
          </div>
        </div>
      </section>

      {/* Trimmed product page — focused on conversion, not a second homepage */}
      <VideoDemo />
      <BeforeAfter />
      <HowItWorks compact />
      <Reviews />
      <Comparison />
      <Guarantee />
      <FAQ />
    </>
  );
}
