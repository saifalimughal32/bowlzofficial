import { collectionTrustBanner } from "@/data/content";

export function CollectionTrustBar() {
  return (
    <section className="border-y border-black/8 bg-white py-4 md:py-5">
      <div className="container-main max-w-[1100px]">
        <p className="text-center text-[0.6875rem] font-bold uppercase leading-relaxed tracking-[0.1em] text-ink md:text-xs">
          {collectionTrustBanner.primary}
        </p>
        <p className="mt-2 text-center text-[0.625rem] font-semibold uppercase tracking-[0.08em] text-muted md:text-[0.6875rem]">
          {collectionTrustBanner.secondary}
        </p>
      </div>
    </section>
  );
}
