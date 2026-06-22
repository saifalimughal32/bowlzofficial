import Image from "next/image";
import Link from "next/link";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85";

export function HomeHero() {
  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      <Image
        src={HERO_IMAGE}
        alt="Premium ceramic bowls in a warm, minimalist interior"
        fill
        className="object-cover"
        priority
        sizes="100vw"
        quality={90}
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 mx-auto max-w-4xl px-5 py-32 text-center md:px-8">
        <h1 className="mb-8 text-[clamp(2rem,5.5vw,3.75rem)] font-bold uppercase leading-[1.08] tracking-tight text-white">
          Bowls Made for Your Ritual,
          <br />
          Not Your Shelf.
        </h1>
        <Link href="#shop" className="btn-pill btn-pill-white">
          Shop Bowls
        </Link>
      </div>
    </section>
  );
}
