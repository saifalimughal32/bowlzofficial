const storeDomain =
  process.env.SHOPIFY_STORE_DOMAIN ||
  process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const storefrontToken =
  process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN ||
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

export const isAdminConfigured = Boolean(storeDomain && adminToken);
export const isStorefrontConfigured = Boolean(storeDomain && storefrontToken);
export const isShopifyConfigured = isAdminConfigured || isStorefrontConfigured;

export function getStoreDomain() {
  return storeDomain!;
}

export function getAdminToken() {
  return adminToken!;
}

export function getStorefrontTokenSync() {
  return storefrontToken ?? null;
}

export async function adminGraphql<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!isAdminConfigured) {
    throw new Error("Shopify Admin API is not configured");
  }

  const res = await fetch(
    `https://${getStoreDomain()}/admin/api/2025-01/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": getAdminToken(),
      },
      body: JSON.stringify({ query, variables }),
      next: { revalidate: 60 },
    }
  );

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }
  return json.data as T;
}

let cachedStorefrontToken: string | null = null;

export async function resolveStorefrontToken(): Promise<string | null> {
  if (storefrontToken) return storefrontToken;
  if (cachedStorefrontToken) return cachedStorefrontToken;
  if (!isAdminConfigured) return null;

  type TokenList = {
    storefrontAccessTokens: { edges: { node: { accessToken: string } }[] };
  };

  const list = await adminGraphql<TokenList>(`
    query {
      storefrontAccessTokens(first: 1) {
        edges { node { accessToken } }
      }
    }
  `);

  const existing = list.storefrontAccessTokens.edges[0]?.node.accessToken;
  if (existing) {
    cachedStorefrontToken = existing;
    return existing;
  }

  type TokenCreate = {
    storefrontAccessTokenCreate: {
      storefrontAccessToken: { accessToken: string } | null;
      userErrors: { message: string }[];
    };
  };

  const created = await adminGraphql<TokenCreate>(`
    mutation {
      storefrontAccessTokenCreate(input: { title: "Nova Triggers Headless" }) {
        storefrontAccessToken { accessToken }
        userErrors { message }
      }
    }
  `);

  const token =
    created.storefrontAccessTokenCreate.storefrontAccessToken?.accessToken ?? null;
  if (token) cachedStorefrontToken = token;
  return token;
}
