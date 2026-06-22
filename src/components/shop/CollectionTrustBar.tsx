import { trustSignals } from "@/data/content";

export function CollectionTrustBar() {
  return (
    <section className="border-b border-black/8 bg-white py-5 md:py-6">
      <div className="container-main max-w-[1100px]">
        <ul className="flex flex-col items-center gap-2 text-center md:flex-row md:flex-wrap md:justify-center md:gap-x-8 md:gap-y-2">
          {trustSignals.map((item, index) => (
            <li
              key={item.label}
              className="flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-ink md:text-xs"
            >
              {index > 0 && (
                <span className="hidden text-muted md:inline" aria-hidden="true">
                  ·
                </span>
              )}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center text-[0.6875rem] font-medium uppercase tracking-[0.08em] text-muted md:text-xs">
          Free shipping on orders $75+ · Easy returns · Secure checkout
        </p>
      </div>
    </section>
  );
}
