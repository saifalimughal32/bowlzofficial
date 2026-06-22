import Image from "next/image";
import Link from "next/link";
import { HomeSection } from "@/components/home/HomeSection";
import { collections } from "@/data/content";
import { cn } from "@/lib/utils";

export function HomeCollections() {
  return (
    <HomeSection>
      <div className="container-main">
        <div className="grid gap-5 sm:grid-cols-2 md:gap-6">
          {collections.map((col, i) => (
            <Link
              key={col.label}
              href={col.href}
              className={cn(
                "group block",
                i === collections.length - 1 &&
                  collections.length % 2 !== 0 &&
                  "sm:col-span-2 sm:max-w-xl sm:justify-self-center sm:w-full"
              )}
            >
              <div className="image-banner relative aspect-[4/3] sm:aspect-[16/10]">
                <Image
                  src={col.image}
                  alt={col.label}
                  fill
                  className="object-cover transition-opacity duration-300 group-hover:opacity-95"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/25 transition-colors duration-200 group-hover:bg-black/30" />
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <span className="rounded-full bg-white px-8 py-3.5 text-sm font-bold uppercase tracking-[0.06em] text-ink md:text-[0.9375rem]">
                    {col.label}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
