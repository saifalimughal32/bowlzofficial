import type { Metadata } from "next";
import { CollectionTrustBar } from "@/components/shop/CollectionTrustBar";
import { ShopProductSection } from "@/components/shop/ShopProductSection";
import type { ProductSection } from "@/data/content";
import { siteConfig } from "@/data/content";

type Props = {
  section: ProductSection;
  showSwatches?: boolean;
};

export function CollectionPage({ section, showSwatches = false }: Props) {
  return (
    <>
      <div className="bg-white pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="container-main max-w-[1100px]">
          <h1 className="shop-section-title">{section.title}</h1>
        </div>
      </div>
      <CollectionTrustBar />
      <ShopProductSection
        id={section.id}
        title={`${section.title}:`}
        products={section.products}
        shopAllHref={section.shopAllHref}
        shopAllLabel={section.shopAllLabel}
        columns={section.columns === 4 ? 3 : 2}
        showSwatches={showSwatches}
      />
    </>
  );
}

export function collectionMetadata(section: ProductSection): Metadata {
  return {
    title: section.title,
    description: `Shop ${section.title} from ${siteConfig.name}. ${siteConfig.description}`,
  };
}
