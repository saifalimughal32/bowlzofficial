import type { Metadata } from "next";
import { CollectionPage, collectionMetadata } from "@/components/shop/CollectionPage";
import { productSections } from "@/data/content";

const section = productSections.find((s) => s.id === "bowlz")!;

export const metadata: Metadata = collectionMetadata(section);

export default function BowlzCollectionPage() {
  return <CollectionPage section={section} showSwatches />;
}
