# Bowlz Shopify Theme

Online Store 2.0 theme converted from the Bowlz Next.js storefront. Preserves brand colors, typography (Inter + Playfair Display), spacing, animations, and responsive layout.

## Requirements

- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli) 3.x
- A Shopify store (development or production)
- Partner account or store staff access

## Quick start

```bash
cd shopify-theme

# Log in to your Shopify partner/store account
shopify auth login

# Start local development (creates theme preview + hot reload)
shopify theme dev --store YOUR-STORE.myshopify.com
```

The dev server prints a preview URL. Changes to Liquid, CSS, and JS reload automatically.

## Deploy to a store

### Push as a new unpublished theme

```bash
shopify theme push --store YOUR-STORE.myshopify.com --unpublished
```

### Push and publish (production)

```bash
shopify theme push --store YOUR-STORE.myshopify.com --live
```

### Pull remote changes

```bash
shopify theme pull --store YOUR-STORE.myshopify.com
```

## Upload zip (under 50 MB)

Shopify theme uploads must stay **under 50 MB**. The hero video (`bongz-hero.mp4`, ~35 MB) is **not** included in `bowlz-shopify-theme-upload.zip`.

After installing the theme:

1. Go to **Content → Files** and upload `bongz-hero.mp4` (or use the file from `public/videos/` in this repo).
2. Open **Theme customizer → Home page → Video banner** and select the uploaded video under **Hero video**.

Until then, a dark gradient (or optional **Poster image**) is shown.

## Post-install setup

1. **Navigation** — Create menus in Shopify Admin → Online Store → Navigation:
   - `main-menu`: Home, Shop (with Bowlz, Bongz, Cleaning Gear), Wholesale, Contact
   - `footer-shop`, `footer-learn`, `footer-support`: footer link groups

2. **Collections** — Assign collections in the theme customizer for:
   - Home → Bowlz grid (`home-best-products`)
   - Home → Bongz carousel (`home-product-carousel`)
   - Home → Collection cards (`home-collections`)

3. **Pages** — Create pages with handles:
   - `contact` → uses template `page.contact`
   - `wholesale` → uses template `page.wholesale`

4. **Theme settings** — Customize under Theme settings:
   - Brand colors, logo, promo text
   - Free shipping threshold ($75 default)
   - Customer count (50,000), star rating, social URLs
   - Cart upsell product (e.g. Swabz)

5. **Cart upsell** — Set `Cart upsell product` in theme settings to enable in-drawer Swabz upsell.

## Theme structure

```
shopify-theme/
├── assets/          bowlz.css, bowlz.js, logo, hero video
├── config/          settings_schema.json, settings_data.json
├── layout/          theme.liquid
├── locales/         en.default.json
├── sections/        OS 2.0 sections with {% schema %}
├── snippets/        Reusable Liquid partials
└── templates/       JSON templates (index, product, collection, pages)
```

## Features

- **Ajax cart drawer** — `/cart/add.js`, `/cart/change.js`, section rendering via `?section_id=cart-drawer`
- **Age gate** — localStorage verification (`bowlz_age_verified`)
- **Animations** — 42s press marquee, wholesale-reveal, btn-success-pulse, animated counters
- **Product page** — Gallery, variant picker, sticky mobile ATC, FAQ, reviews
- **Collection page** — Trust banner + product grid with pagination

## Homepage section order

1. Video banner
2. As seen in (press marquee)
3. Bowlz product grid
4. Trust bar
5. Bongz product carousel
6. Editorial banner
7. Collections
8. Reviews
9. Wholesale CTA

## Development notes

- CSS is plain CSS (no Tailwind) in `assets/bowlz.css`
- JS is vanilla ES5-compatible in `assets/bowlz.js`
- Checkout uses native Shopify `/checkout` from cart drawer
- Contact/wholesale forms use `mailto:` (replace with Shopify Forms or a third-party app for production)

## Support

Questions: hello@bowlzofficial.com
