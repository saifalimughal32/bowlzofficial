# Nova Triggers — Headless Shopify Storefront

Custom Next.js frontend for **Nova Triggers**, deployed on **Vercel** via **GitHub**.  
**Shopify** handles products, checkout, orders, and inventory — no Liquid theme.

## Stack

- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Commerce:** Shopify Storefront API (headless)
- **Checkout:** Shopify hosted checkout (redirect from cart)
- **Deploy:** Vercel + GitHub

## Quick start

```bash
npm install
cp .env.example .env.local
# Add your Shopify credentials (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

The site runs with mock product data until Shopify env vars are set.

---

## Shopify setup (headless)

### 1. Create Storefront API access token

1. Shopify Admin → **Settings → Apps and sales channels → Develop apps**
2. Create an app → **Configure Storefront API scopes:**
   - `unauthenticated_read_product_listings`
   - `unauthenticated_read_product_inventory`
   - `unauthenticated_write_checkouts` (or cart mutations scope)
   - `unauthenticated_read_checkouts`
3. Install the app → copy **Storefront API access token**

### 2. Create your product in Shopify Admin

- **Title:** Nova Triggers™ Cordless Period Heat + Massage Pad
- **Handle:** `period-heating-pad`
- **Variants:** 1 Pad ($49), 2 Pads ($79), 3 Pads ($99)
- Set compare-at prices for savings display
- Upload 5+ product images

### 3. Environment variables

Add to `.env.local` (local) and **Vercel → Project → Settings → Environment Variables**:

| Variable | Example |
|----------|---------|
| `SHOPIFY_STORE_DOMAIN` | `tak0s7-0f.myshopify.com` |
| `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` | `shpat_...` or storefront token |
| `NEXT_PUBLIC_SITE_URL` | `https://novatriggers.com` |

---

## Deploy to Vercel via GitHub

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial headless Nova Triggers storefront"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nova-triggers.git
git push -u origin main
```

### 2. Connect Vercel

1. [vercel.com/new](https://vercel.com/new) → Import GitHub repo
2. Framework preset: **Next.js** (auto-detected)
3. Add environment variables from `.env.example`
4. Deploy

### 3. Custom domain

Vercel → **Project → Settings → Domains** → add `novatriggers.com`

In Shopify Admin → **Settings → Domains**, your custom domain can point to this Vercel site while checkout stays on Shopify.

---

## Project structure

```
src/
├── app/                    # Next.js routes
│   ├── page.tsx            # Homepage
│   ├── products/[handle]/  # Product page
│   └── api/cart/           # Cart API (Storefront API)
├── components/
│   ├── sections/           # Homepage sections
│   ├── product/            # Buy box, gallery
│   ├── cart/               # Cart drawer + provider
│   └── layout/             # Header, footer, announcement
├── lib/shopify/            # Storefront API client + queries
└── data/content.ts         # Copy, reviews, FAQ, bundles
```

## Legacy theme folder

The `/theme/` and `/preview/` folders are **legacy Shopify Liquid theme files** — not used in this headless setup. They are gitignored and can be deleted.

---

## Cart & checkout flow

1. Customer selects bundle on product page
2. **Add to Cart** → Storefront API creates/updates cart
3. Cart drawer opens with line items
4. **Checkout** → redirects to Shopify hosted checkout
5. Order, payment, fulfillment managed in Shopify Admin

---

## Compliance

All copy uses comfort/relief language — no medical claims. Footer includes required disclaimer.

---

Built for Nova Triggers · USA market · Premium DTC wellness
