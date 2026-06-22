import { HomeSection } from "@/components/home/HomeSection";
import { ProductCard } from "@/components/home/ProductCard";
import { SectionFooterLink, SectionHeader } from "@/components/home/SectionHeader";
import type { StoreProduct } from "@/data/content";

type Props = {
  id?: string;
  title: string;
  products: StoreProduct[];
  seeAllHref?: string;
  seeAllLabel?: string;
};

export function HomeProductGrid({
  id,
  title,
  products,
  seeAllHref,
  seeAllLabel,
}: Props) {
  return (
    <HomeSection id={id}>
      <div className="container-main">
        <SectionHeader title={title} />
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 md:gap-x-6 md:gap-y-12">
          {products.map((product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
        </div>
        {seeAllHref && seeAllLabel && (
          <SectionFooterLink href={seeAllHref} label={seeAllLabel} />
        )}
      </div>
    </HomeSection>
  );
}
