import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProduct } from "@/lib/shopify";
import { isBowlProduct } from "@/lib/productCategory";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductPolicies } from "@/components/product/ProductPolicies";
import { ProductSizingGuide } from "@/components/product/ProductSizingGuide";
import { ProductHowItWorks } from "@/components/product/ProductHowItWorks";
import { ProductDescription } from "@/components/product/ProductDescription";
import { ProductContactCta } from "@/components/product/ProductContactCta";
import { HomeReviews } from "@/components/home/HomeReviews";
import { Comparison } from "@/components/sections/Comparison";
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

  const showSizingGuide = isBowlProduct(handle);

  return (
    <>
      <section className="product-page-hero pb-12 pt-24 md:pb-16 md:pt-28">
        <div className="container-main">
          <nav className="mb-6 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/shop" className="transition-colors hover:text-ink">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink">{product.title}</span>
          </nav>

          <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-10 xl:gap-14">
            <div className="lg:sticky lg:top-28">
              <ProductGallery product={product} />
            </div>
            <ProductBuyBox product={product} />
          </div>
        </div>
      </section>

      <ProductDescription description={product.description} />
      <ProductHowItWorks />
      <ProductPolicies />
      {showSizingGuide && <ProductSizingGuide />}
      <Comparison />
      <HomeReviews />
      <FAQ />
      <ProductContactCta />
    </>
  );
}
