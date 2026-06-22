import { HomeSection } from "@/components/home/HomeSection";
import { ProductCard } from "@/components/home/ProductCard";
import { SectionFooterLink, SectionHeader } from "@/components/home/SectionHeader";
import { ProductCarousel } from "@/components/shop/ProductCarousel";
import type { StoreProduct } from "@/data/content";

type Props = {
  id?: string;
  title: string;
  products: StoreProduct[];
  seeAllHref?: string;
  seeAllLabel?: string;
  layout?: "grid" | "carousel";
};

export function HomeProductGrid({
  id,
  title,
  products,
  seeAllHref,
  seeAllLabel,
  layout = "grid",
}: Props) {
  return (
    <HomeSection id={id}>
      <div className="container-main">
        <SectionHeader title={title} />
        {layout === "carousel" ? (
          <ProductCarousel products={products} />
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.handle} product={product} />
            ))}
          </div>
        )}
        {seeAllHref && seeAllLabel && (
          <SectionFooterLink href={seeAllHref} label={seeAllLabel} />
        )}
      </div>
    </HomeSection>
  );
}
