import Image from "next/image";
import Link from "next/link";
import { HomeSection } from "@/components/home/HomeSection";
import { editorial, siteConfig } from "@/data/content";

export function HomeEditorial() {
  const headline = editorial.headline.replace("\n", " ");

  return (
    <HomeSection tight className="!pb-0">
      <div className="container-main">
        <Link href="/shop/bowlz" className="group block">
          <div className="image-banner relative aspect-[16/9] sm:aspect-[21/9]">
            <Image
              src={editorial.image}
              alt={headline}
              fill
              className="object-cover transition-opacity duration-300 group-hover:opacity-95"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 lg:p-12">
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/80 md:text-sm">
                {siteConfig.name}
              </p>
              <h2 className="max-w-xl text-2xl font-bold uppercase leading-tight text-white md:text-3xl lg:text-4xl">
                {headline}
              </h2>
            </div>
          </div>
        </Link>
      </div>
    </HomeSection>
  );
}
