import Image from "next/image";
import Link from "next/link";
import { HomeSection } from "@/components/home/HomeSection";
import { SectionHeader } from "@/components/home/SectionHeader";
import { collections } from "@/data/content";

export function HomeCollections() {
  return (
    <HomeSection>
      <div className="container-main">
        <SectionHeader
          title="Collections"
          className="mb-10 text-center md:mb-14 [&_h2]:mx-auto"
        />

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {collections.map((col) => (
            <Link
              key={col.href}
              href={col.href}
              className="collection-card group flex flex-col overflow-hidden rounded-2xl border border-black/[0.06] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)]"
            >
              <div className="relative aspect-[4/5] bg-[#f4f4f4]">
                <Image
                  src={col.image}
                  alt={col.title}
                  fill
                  className="object-contain p-8 transition-transform duration-500 group-hover:scale-[1.03] md:p-10"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col items-center border-t border-black/[0.06] px-6 py-6 text-center md:py-7">
                <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-muted">
                  {col.subtitle}
                </p>
                <h3 className="mt-1.5 text-lg font-bold tracking-tight text-ink md:text-xl">
                  {col.title}
                </h3>
                <span className="mt-4 inline-flex min-h-[44px] items-center rounded-full border border-ink/15 px-6 text-xs font-bold uppercase tracking-[0.08em] text-ink transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-white">
                  {col.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
