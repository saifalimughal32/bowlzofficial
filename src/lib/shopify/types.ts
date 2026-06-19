export type Money = {
  amount: string;
  currencyCode: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  price: Money;
  compareAtPrice: Money | null;
  availableForSale: boolean;
};

export type ProductImage = {
  url: string;
  altText: string | null;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  images: ProductImage[];
  variants: ProductVariant[];
};

export type CartLine = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: { title: string; handle: string };
    image: ProductImage | null;
    price: Money;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    totalAmount: Money;
    subtotalAmount: Money;
  };
  lines: CartLine[];
};

export type ShopifyProductResponse = {
  data?: {
    product?: Product | null;
  };
  errors?: { message: string }[];
};

export type ShopifyCartResponse = {
  data?: Record<string, { cart?: Cart | null; userErrors?: { message: string }[] }>;
  errors?: { message: string }[];
};
