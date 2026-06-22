import type { ProductVariant } from "@/lib/shopify/types";

export type VariantOptionGroup = {
  name: string;
  values: string[];
};

/** Parse Shopify variant titles like "Black Mamba / 14mm" into option groups. */
export function parseVariantOptions(variants: ProductVariant[]): VariantOptionGroup[] {
  if (variants.length <= 1) return [];

  const parsed = variants.map((v) =>
    v.title.split(" / ").map((s) => s.trim()).filter(Boolean)
  );

  const columnCount = Math.max(...parsed.map((p) => p.length));
  if (columnCount < 2) {
    return [{ name: "Option", values: [...new Set(variants.map((v) => v.title))] }];
  }

  const groups: VariantOptionGroup[] = [];
  for (let col = 0; col < columnCount; col++) {
    const values = [...new Set(parsed.map((p) => p[col]).filter(Boolean))];
    if (values.length === 0) continue;
    const name =
      col === 0 && values.some((v) => /mm/i.test(v))
        ? "Size"
        : col === 0
          ? "Color"
          : values.some((v) => /mm/i.test(v))
            ? "Size"
            : "Color";
    groups.push({ name, values });
  }

  return dedupeGroups(groups);
}

function dedupeGroups(groups: VariantOptionGroup[]): VariantOptionGroup[] {
  const seen = new Set<string>();
  return groups.filter((g) => {
    const key = g.values.join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function findVariantIndex(
  variants: ProductVariant[],
  selections: Record<string, string>
): number {
  const index = variants.findIndex((variant) => {
    const parts = variant.title.split(" / ").map((s) => s.trim());
    const values = Object.values(selections);
    return values.every((val) => parts.includes(val));
  });
  return index >= 0 ? index : 0;
}

export function getInitialSelections(
  variants: ProductVariant[],
  groups: VariantOptionGroup[]
): Record<string, string> {
  const first = variants[0];
  if (!first || groups.length === 0) return {};

  const parts = first.title.split(" / ").map((s) => s.trim());
  const selections: Record<string, string> = {};
  groups.forEach((group, i) => {
    const match = parts.find((p) => group.values.includes(p));
    if (match) selections[group.name] = match;
    else if (group.values[i]) selections[group.name] = group.values[0];
  });
  return selections;
}
