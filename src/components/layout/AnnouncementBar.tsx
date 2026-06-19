import { siteConfig } from "@/data/content";

export function AnnouncementBar() {
  return (
    <div className="bg-plum px-4 py-2.5 text-center text-[0.8125rem] tracking-wide text-white">
      <p>
        Free USA Shipping over ${siteConfig.freeShippingThreshold} · 30-Night Comfort
        Guarantee · Ships from the USA
      </p>
    </div>
  );
}
