/**
 * Ensures the Nova Triggers belt product has 1/2/3-belt variants and is published.
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
const handle =
  process.env.SHOPIFY_PRODUCT_HANDLE || "heated-menstrual-relief-vibration-belt";
const apiVersion = process.env.SHOPIFY_API_VERSION || "2025-01";

const BUNDLE_VARIANTS = [
  { title: "1 Belt", price: "55.58", compareAtPrice: "79.00" },
  { title: "2 Belts", price: "99.00", compareAtPrice: "111.00" },
  { title: "3 Belts", price: "139.00", compareAtPrice: "167.00" },
];

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

async function adminRest(path, method = "GET", body) {
  const res = await fetch(`https://${domain}/admin/api/${apiVersion}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": adminToken,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.errors || JSON.stringify(json));
  }
  return json;
}

const PRODUCT_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      status
      options { id name values }
      variants(first: 10) {
        edges {
          node { id title price compareAtPrice }
        }
      }
    }
    publications(first: 20) {
      edges { node { id name } }
    }
  }
`;

const PRODUCT_CREATE = `
  mutation ProductCreate($product: ProductCreateInput!) {
    productCreate(product: $product) {
      product { id handle title }
      userErrors { field message }
    }
  }
`;

const OPTIONS_SET = `
  mutation ProductOptionsCreate($productId: ID!, $options: [OptionCreateInput!]!, $variantStrategy: ProductOptionCreateVariantStrategy) {
    productOptionsCreate(productId: $productId, options: $options, variantStrategy: $variantStrategy) {
      product { id }
      userErrors { field message }
    }
  }
`;

const VARIANTS_BULK_CREATE = `
  mutation VariantsBulkCreate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
    productVariantsBulkCreate(productId: $productId, variants: $variants, strategy: REMOVE_STANDALONE_VARIANT) {
      productVariants { id title price }
      userErrors { field message }
    }
  }
`;

const VARIANTS_BULK_UPDATE = `
  mutation VariantsBulkUpdate($productId: ID!, $variants: [ProductVariantsBulkInput!]!) {
    productVariantsBulkUpdate(productId: $productId, variants: $variants) {
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

async function ensureBundleVariants(productId, existingVariants, options) {
  const hasPackOption = options.some((o) => o.name === "Pack");
  const variantTitles = existingVariants.map((v) => v.title);
  const needsVariants =
    existingVariants.length !== 3 ||
    !BUNDLE_VARIANTS.every((b) => variantTitles.includes(b.title));

  if (!needsVariants) {
    console.log("Product already has 3 belt variants.");
    return;
  }

  if (!hasPackOption) {
    console.log("Adding Pack option with 3 belt variants...");
    try {
      const created = await adminGraphql(OPTIONS_SET, {
        productId,
        options: [
          {
            name: "Pack",
            values: BUNDLE_VARIANTS.map((b) => ({ name: b.title })),
          },
        ],
        variantStrategy: "CREATE",
      });
      const oErrors = created.productOptionsCreate.userErrors;
      if (oErrors?.length) {
        console.warn("Option create warnings:", oErrors.map((e) => e.message).join("; "));
      }
    } catch (err) {
      console.log("GraphQL option create failed, trying variants bulk create...");
    }
  }

  if (existingVariants.length === 1 && existingVariants[0].title === "Default Title") {
    console.log("Replacing default variant with belt bundles...");
    const result = await adminGraphql(VARIANTS_BULK_CREATE, {
      productId,
      variants: BUNDLE_VARIANTS.map((b) => ({
        price: b.price,
        compareAtPrice: b.compareAtPrice,
        optionValues: [{ optionName: "Pack", name: b.title }],
      })),
    });
    const vErrors = result.productVariantsBulkCreate?.userErrors;
    if (vErrors?.length) {
      console.warn("Variant create warnings:", vErrors.map((e) => e.message).join("; "));
    } else {
      console.log("Created 3 belt bundle variants.");
    }
    return;
  }

  if (existingVariants.length === 3) {
    console.log("Updating existing variant prices...");
    const result = await adminGraphql(VARIANTS_BULK_UPDATE, {
      productId,
      variants: existingVariants.map((v, i) => ({
        id: v.id,
        price: BUNDLE_VARIANTS[i]?.price ?? v.price,
        compareAtPrice: BUNDLE_VARIANTS[i]?.compareAtPrice,
      })),
    });
    const uErrors = result.productVariantsBulkUpdate?.userErrors;
    if (uErrors?.length) {
      console.warn("Variant update warnings:", uErrors.map((e) => e.message).join("; "));
    } else {
      console.log("Updated variant prices.");
    }
  }
}

async function publishProduct(productId, publications) {
  for (const channel of ["Online Store", "Headless"]) {
    const pub = publications.find((e) => e.node.name === channel);
    if (!pub) continue;
    const result = await adminGraphql(PUBLISH, {
      id: productId,
      input: [{ publicationId: pub.node.id }],
    });
    const pErrors = result.publishablePublish.userErrors;
    if (pErrors?.length) {
      console.warn(`Publish to ${channel} warnings:`, pErrors.map((e) => e.message).join("; "));
    } else {
      console.log(`Published to ${channel}.`);
    }
  }
}

async function main() {
  console.log(`Checking Shopify store: ${domain}`);
  console.log(`Target handle: ${handle}`);

  let product;
  let publications = [];

  try {
    const data = await adminGraphql(PRODUCT_QUERY, { handle });
    product = data.productByHandle;
    publications = data.publications.edges;
  } catch (graphqlErr) {
    console.warn("GraphQL failed:", graphqlErr.message);
    console.log("Trying REST API...");
    const rest = await adminRest(`/products.json?handle=${handle}`);
    const restProduct = rest.products?.[0];
    if (!restProduct) {
      throw new Error(`Product "${handle}" not found and cannot create without read_products scope.`);
    }
    product = {
      id: `gid://shopify/Product/${restProduct.id}`,
      handle: restProduct.handle,
      title: restProduct.title,
      status: restProduct.status,
      options: restProduct.options,
      variants: { edges: restProduct.variants.map((v) => ({ node: v })) },
    };
  }

  if (!product) {
    console.log("Product not found — creating...");
    const created = await adminGraphql(PRODUCT_CREATE, {
      product: {
        title: "Heated Menstrual Relief Vibration Belt",
        handle,
        descriptionHtml:
          "<p>Instant heat and gentle vibration belt. Warms in 3 seconds with 3 heat levels and 3 vibration modes. USB rechargeable, adjustable up to 50\".</p>",
        status: "ACTIVE",
        productType: "Health & Wellness",
        vendor: "Nova Triggers",
      },
    });
    const errors = created.productCreate.userErrors;
    if (errors?.length) throw new Error(errors.map((e) => e.message).join("; "));
    product = created.productCreate.product;
    console.log(`Created product: ${product.title}`);
  } else {
    console.log(`Product exists: ${product.title}`);
  }

  const existingVariants = product.variants?.edges?.map((e) => e.node) ?? [];
  const options = product.options ?? [];

  await ensureBundleVariants(product.id, existingVariants, options);

  if (publications.length) {
    await publishProduct(product.id, publications);
  }

  try {
    const refreshed = await adminGraphql(PRODUCT_QUERY, { handle });
    const variants = refreshed.productByHandle?.variants?.edges ?? [];
    console.log("\nVariants:");
    for (const { node: v } of variants) {
      console.log(`  - ${v.title}: $${v.price}${v.compareAtPrice ? ` (was $${v.compareAtPrice})` : ""}`);
    }
  } catch {
    console.log("\nCould not list variants (read_products scope may be missing).");
  }

  console.log("\nDone. Redeploy Vercel after any env var updates.");
}

main().catch((err) => {
  console.error("\nError:", err.message || err);
  console.error(
    "\nIf you see 'read_products' or 'write_products' errors, enable these scopes in Shopify Admin:"
  );
  console.error("  Settings → Apps → Develop apps → your app → Configure Admin API scopes");
  console.error("  Enable: read_products, write_products, read_publications, write_publications");
  console.error("  Then reinstall the app and update SHOPIFY_ADMIN_ACCESS_TOKEN on Vercel.");
  process.exit(1);
});
