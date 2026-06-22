"use client";

import { HomeSection } from "@/components/home/HomeSection";
import { ProductCard } from "@/components/home/ProductCard";
import { SectionFooterLink, SectionHeader } from "@/components/home/SectionHeader";
import { bestsellingBowlz, type StoreProduct } from "@/data/content";

type Props = {
  id?: string;
  title?: string;
  products?: StoreProduct[];
  seeAllHref?: string;
  seeAllLabel?: string;
};

export function HomeBestProducts({
  id = "bowlz",
  title = "Bestselling Bowlz",
  products = bestsellingBowlz,
  seeAllHref = "/#bongz",
  seeAllLabel = "See All Products",
}: Props) {
  return (
    <HomeSection id={id}>
      <div className="container-main">
        <SectionHeader title={title} />
        <div className="product-grid">
          {products.map((product, i) => (
            <ProductCard key={product.handle} product={product} priority={i < 2} />
          ))}
        </div>
        {seeAllHref && seeAllLabel && (
          <SectionFooterLink href={seeAllHref} label={seeAllLabel} />
        )}
      </div>
    </HomeSection>
  );
}
