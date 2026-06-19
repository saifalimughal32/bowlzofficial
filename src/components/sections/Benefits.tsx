import { benefits } from "@/data/content";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { ImageSlot } from "@/components/ui/ImageSlot";

type Props = { benefitImages?: string[] };

export function Benefits({ benefitImages = [] }: Props) {
  return (
    <section className="section section-alt">
      <div className="container-main">
        <AnimateIn>
          <h2 className="mb-12 text-center text-[clamp(1.75rem,4vw,2.5rem)]">
            Comfort that fits your real life
          </h2>
        </AnimateIn>
        <div className="space-y-16 md:space-y-24">
          {benefits.map((b, i) => (
            <AnimateIn key={b.title} delay={(i % 2 + 1) as 1 | 2}>
              <div
                className={`grid items-center gap-8 md:grid-cols-2 ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <ImageSlot
                  src={b.imageSrc || benefitImages[i] || ""}
                  alt={b.title}
                  label={b.imageLabel}
                  hint={b.imageHint}
                  aspect="landscape"
                />
                <div>
                  <h3 className="mb-3 font-heading text-2xl">{b.title}</h3>
                  <p className="leading-relaxed text-taupe-dark">{b.description}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
