import Image from "next/image";
import { shopHero } from "@/data/content";

export function ShopHero() {
  return (
    <section className="relative aspect-[16/7] w-full overflow-hidden bg-black sm:aspect-[21/8]">
      <Image
        src={shopHero.image}
        alt={shopHero.alt}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />
    </section>
  );
}
