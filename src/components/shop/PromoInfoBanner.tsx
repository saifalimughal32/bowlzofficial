import { promoHighlights } from "@/data/content";

export function PromoInfoBanner() {
  return (
    <section className="bg-brand py-10 text-white md:py-12">
      <div className="container-main">
        <ul className="grid gap-8 md:grid-cols-3 md:gap-10">
          {promoHighlights.map((item) => (
            <li key={item.title} className="text-center md:text-left">
              <h3 className="mb-2 text-sm font-bold uppercase tracking-[0.06em] md:text-base">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/85">{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
