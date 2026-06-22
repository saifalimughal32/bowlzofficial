import { productHowItWorks } from "@/data/content";

export function ProductHowItWorks() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container-main">
        <h2 className="mb-8 text-center text-xl font-bold text-ink md:mb-10 md:text-2xl">
          How Bowlz Works
        </h2>
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {productHowItWorks.map((step, index) => (
            <div
              key={step.title}
              className="rounded-xl border border-black/8 bg-white p-6 text-center md:p-8"
            >
              <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mb-2 text-lg font-bold text-ink">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
