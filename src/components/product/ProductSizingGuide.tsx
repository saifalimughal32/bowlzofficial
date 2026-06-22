import { bowlSizingGuide } from "@/data/content";

export function ProductSizingGuide() {
  return (
    <section id="sizing-guide" className="bg-white py-10 md:py-14">
      <div className="container-main max-w-3xl">
        <h2 className="mb-4 text-xl font-bold text-ink md:text-2xl">
          {bowlSizingGuide.title}
        </h2>
        <p className="mb-8 text-sm leading-relaxed text-muted md:text-base">
          {bowlSizingGuide.intro}
        </p>
        <ul className="space-y-4">
          {bowlSizingGuide.sizes.map((size) => (
            <li
              key={size.label}
              className={`rounded-xl border p-5 md:p-6 ${
                size.highlight
                  ? "border-brand/30 bg-brand/5"
                  : "border-black/8 bg-white"
              }`}
            >
              <p className="mb-1 text-sm font-bold uppercase tracking-[0.08em] text-ink">
                {size.label}
                {size.highlight && (
                  <span className="ml-2 text-xs font-semibold text-brand">
                    Most common
                  </span>
                )}
              </p>
              <p className="text-sm leading-relaxed text-muted">{size.detail}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
