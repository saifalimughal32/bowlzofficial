export type ProductColor = {
  name: string;
  hex: string;
  image?: string;
};

/** Maps Bowlz Shopify color names to display swatches. */
export const COLOR_HEX: Record<string, string> = {
  "Black Mamba": "#1a1a1a",
  "Slime green": "#8BC34A",
  "Pink Panther": "#E91E8C",
  "Fire OG": "#E53935",
  Blueberry: "#5C6BC0",
  Carbon: "#2B2B2B",
  Tundra: "#B8A99A",
  "Bubble Gum": "#F48FB1",
  Grape: "#7B1FA2",
  Emerald: "#43A047",
  Electric: "#26C6DA",
};

export function colorSwatch(name: string, image?: string): ProductColor {
  return {
    name,
    hex: COLOR_HEX[name] ?? "#888888",
    image,
  };
}
