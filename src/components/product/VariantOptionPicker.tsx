"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/shopify";
import {
  findVariantIndex,
  getInitialSelections,
  parseVariantOptions,
} from "@/lib/variantOptions";
import { COLOR_HEX } from "@/lib/productColors";
import { bowlzProducts } from "@/data/content";

function getCatalogColors(handle: string) {
  return bowlzProducts.find((p) => p.handle === handle)?.colors;
}

type Props = {
  product: Product;
  onSelect: (index: number) => void;
};

export function VariantOptionPicker({ product, onSelect }: Props) {
  const groups = useMemo(() => parseVariantOptions(product.variants), [product.variants]);
  const [selections, setSelections] = useState(() =>
    getInitialSelections(product.variants, groups)
  );
  const catalogColors = getCatalogColors(product.handle);

  if (groups.length === 0) return null;

  const applySelections = (next: Record<string, string>) => {
    setSelections(next);
    const index = findVariantIndex(product.variants, next);
    onSelect(index);
  };

  return (
    <div className="mb-6 space-y-5">
      {groups.map((group) => {
        const isColor = group.name === "Color";
        return (
          <div key={group.name}>
            <p className="form-label">
              {group.name}
              {selections[group.name] && (
                <span className="ml-2 font-normal normal-case text-muted">
                  — {selections[group.name]}
                </span>
              )}
            </p>
            {isColor ? (
              <div className="flex flex-wrap gap-2.5">
                {group.values.map((value) => {
                  const isSelected = selections[group.name] === value;
                  const hex = COLOR_HEX[value] ?? catalogColors?.find((c) => c.name === value)?.hex ?? "#888";
                  const soldOut = !product.variants.some((v) => {
                    const parts = v.title.split(" / ").map((s) => s.trim());
                    return parts.includes(value) && v.availableForSale !== false;
                  });
                  return (
                    <button
                      key={value}
                      type="button"
                      title={value}
                      disabled={soldOut}
                      onClick={() => applySelections({ ...selections, [group.name]: value })}
                      className={`relative h-9 w-9 rounded-full border-2 transition-all ${
                        isSelected
                          ? "border-ink ring-2 ring-ink/20 ring-offset-2"
                          : "border-black/15 hover:border-ink/40"
                      } ${soldOut ? "cursor-not-allowed opacity-35" : ""}`}
                      style={{ backgroundColor: hex }}
                      aria-label={value}
                      aria-pressed={isSelected}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {group.values.map((value) => {
                  const isSelected = selections[group.name] === value;
                  const soldOut = !product.variants.some((v) => {
                    const parts = v.title.split(" / ").map((s) => s.trim());
                    return parts.includes(value) && v.availableForSale !== false;
                  });
                  return (
                    <button
                      key={value}
                      type="button"
                      disabled={soldOut}
                      onClick={() => applySelections({ ...selections, [group.name]: value })}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        isSelected
                          ? "border-ink bg-ink text-white"
                          : "border-black/15 bg-white text-ink hover:border-ink/40"
                      } ${soldOut ? "cursor-not-allowed opacity-40" : ""}`}
                    >
                      {value}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
