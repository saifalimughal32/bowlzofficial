import { siteConfig } from "@/data/content";

export function AnnouncementBar() {
  return (
    <div className="fixed top-0 z-[101] w-full border-b border-white/5 bg-ink/95 px-4 py-2 text-center text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-white/60 backdrop-blur-md">
      Free USA shipping over ${siteConfig.freeShippingThreshold} · 30-night guarantee · Ships from California
    </div>
  );
}
