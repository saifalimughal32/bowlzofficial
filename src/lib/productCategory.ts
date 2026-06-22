const BOWLZ = new Set(["bowlz-v2", "v3-18mm", "faceted", "xl-pre-order", "platinum"]);
const BONGZ = new Set([
  "tubez",
  "beakerz",
  "percs",
  "base",
  "tubez-replacement-neck",
  "replacement-glass-downstem",
]);

export function getProductCategoryLabel(handle: string): string {
  if (BOWLZ.has(handle)) return "Magnetic Bowl Piece";
  if (BONGZ.has(handle)) return "Magnetic Glass";
  if (handle === "swabz") return "Cleaning Gear";
  if (handle.includes("replacement")) return "Replacement Part";
  return "Accessory";
}

export function isBowlProduct(handle: string): boolean {
  return BOWLZ.has(handle);
}
