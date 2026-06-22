import Link from "next/link";
import { ProductCard } from "@/components/home/ProductCard";
import type { StoreProduct } from "@/data/content";
import { cn } from "@/lib/utils";

type Props = {
  id: string;
  title: string;
  products: StoreProduct[];
  shopAllHref?: string;
  shopAllLabel?: string;
  columns?: 2 | 3;
  showSwatches?: boolean;
  hideTitle?: boolean;
};

export function ShopProductSection({
  id,
  title,
  products,
  shopAllHref,
  shopAllLabel,
  columns = 2,
  showSwatches = false,
  hideTitle = false,
}: Props) {
  const isExternal = shopAllHref?.startsWith("http");

  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-24 bg-white py-10 md:py-14",
        hideTitle && "pt-0 md:pt-2"
      )}
    >
      <div className="container-main max-w-[1100px]">
        {!hideTitle && (
          <h2 className="shop-category-title mb-8 md:mb-10">{title}:</h2>
        )}

        <div
          className={cn(
            "grid gap-x-6 gap-y-10 md:gap-x-10 md:gap-y-12",
            columns === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3"
          )}
        >
          {products.map((product, i) => (
            <ProductCard
              key={product.handle}
              product={product}
              priority={i < 4}
              showSwatches={showSwatches}
            />
          ))}
        </div>

        {shopAllHref && shopAllLabel && (
          <div className="mt-10 text-center md:mt-12">
            {isExternal ? (
              <a
                href={shopAllHref}
                className="shop-all-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {shopAllLabel} →
              </a>
            ) : (
              <Link href={shopAllHref} className="shop-all-link">
                {shopAllLabel} →
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
