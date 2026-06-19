/**
 * Ensures the Nova Triggers product exists in Shopify and is published.
 * Usage: node scripts/ensure-shopify-product.mjs
 * Requires SHOPIFY_STORE_DOMAIN + SHOPIFY_ADMIN_ACCESS_TOKEN in .env.local
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

function loadEnvFile(path) {
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(resolve(process.cwd(), ".env.local"));

const domain = process.env.SHOPIFY_STORE_DOMAIN;
const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN;
const handle = process.env.SHOPIFY_PRODUCT_HANDLE || "period-heating-pad";
const apiVersion = process.env.SHOPIFY_API_VERSION || "2025-01";

if (!domain || !adminToken) {
  console.error("Missing SHOPIFY_STORE_DOMAIN or SHOPIFY_ADMIN_ACCESS_TOKEN in .env.local");
  process.exit(1);
}

async function adminGraphql(query, variables = {}) {
  const res = await fetch(`https://${domain}/admin/api/${apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminToken,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join("; "));
  }
  return json.data;
}

const PRODUCT_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      status
    }
    publications(first: 20) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;

const PRODUCT_CREATE = `
  mutation ProductCreate($product: ProductCreateInput!) {
    productCreate(product: $product) {
      product {
        id
        handle
        title
      }
      userErrors { field message }
    }
  }
`;

const VARIANTS_BULK_CREATE = `
  mutation VariantsBulkCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
    productVariantsBulkCreate(productId: $productId, variants: $variants) {
      productVariants { id title price }
      userErrors { field message }
    }
  }
`;

const PUBLISH = `
  mutation PublishablePublish($id: ID!, $input: [PublicationInput!]!) {
    publishablePublish(id: $id, input: $input) {
      publishable { ... on Product { handle status } }
      userErrors { field message }
    }
  }
`;

async function main() {
  console.log(`Checking Shopify store: ${domain}`);
  console.log(`Target handle: ${handle}`);

  let data = await adminGraphql(PRODUCT_QUERY, { handle });
  let product = data.productByHandle;

  if (!product) {
    console.log("Product not found — creating...");
    const created = await adminGraphql(PRODUCT_CREATE, {
      product: {
        title: "Nova Triggers™ Cordless Period Heat + Massage Pad",
        handle,
        descriptionHtml:
          "<p>Soothing, cordless heat and gentle massage you can wear under your clothes. Designed for comfort during your cycle.</p>",
        status: "ACTIVE",
        productType: "Health & Wellness",
        vendor: "Nova Triggers",
      },
    });

    const errors = created.productCreate.userErrors;
    if (errors?.length) {
      throw new Error(errors.map((e) => e.message).join("; "));
    }

    product = created.productCreate.product;
    console.log(`Created product: ${product.title} (${product.handle})`);

    const variants = await adminGraphql(VARIANTS_BULK_CREATE, {
      productId: product.id,
      variants: [
        { price: "49.00", compareAtPrice: "79.00", optionValues: [{ optionName: "Title", name: "1 Pad" }] },
        { price: "79.00", compareAtPrice: "98.00", optionValues: [{ optionName: "Title", name: "2 Pads" }] },
        { price: "99.00", compareAtPrice: "147.00", optionValues: [{ optionName: "Title", name: "3 Pads" }] },
      ],
    });

    const vErrors = variants.productVariantsBulkCreate.userErrors;
    if (vErrors?.length) {
      console.warn("Variant warnings:", vErrors.map((e) => e.message).join("; "));
    } else {
      console.log("Created bundle variants.");
    }
  } else {
    console.log(`Product exists: ${product.title} (${product.status})`);
  }

  data = await adminGraphql(PRODUCT_QUERY, { handle });
  const onlineStore = data.publications.edges.find(
    (e) => e.node.name === "Online Store"
  );

  if (onlineStore && product?.id) {
    const pub = await adminGraphql(PUBLISH, {
      id: product.id,
      input: [{ publicationId: onlineStore.node.id }],
    });
    const pErrors = pub.publishablePublish.userErrors;
    if (pErrors?.length) {
      console.warn("Publish warnings:", pErrors.map((e) => e.message).join("; "));
    } else {
      console.log("Published to Online Store.");
    }
  }

  const storefrontList = await adminGraphql(`
    query { storefrontAccessTokens(first: 5) { edges { node { title accessToken } } } }
  `);

  const token = storefrontList.storefrontAccessTokens.edges[0]?.node;
  if (token) {
    console.log("\nStorefront token exists. Add to Vercel if cart still fails:");
    console.log("SHOPIFY_STOREFRONT_ACCESS_TOKEN=<token>");
    console.log("NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=<token>");
  } else {
    const created = await adminGraphql(`
      mutation {
        storefrontAccessTokenCreate(input: { title: "Nova Triggers Headless" }) {
          storefrontAccessToken { accessToken }
          userErrors { message }
        }
      }
    `);
    const newToken = created.storefrontAccessTokenCreate.storefrontAccessToken?.accessToken;
    if (newToken) {
      console.log("\nCreated Storefront API token — add to Vercel:");
      console.log(`SHOPIFY_STOREFRONT_ACCESS_TOKEN=${newToken}`);
      console.log(`NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=${newToken}`);
    }
  }

  console.log("\nDone. Redeploy Vercel after updating env vars.");
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
