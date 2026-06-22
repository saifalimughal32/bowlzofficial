# Bowlz Website — Complete Launch Plan

Target: headless rebuild of [bowlzofficial.com](https://bowlzofficial.com/) on Next.js + Shopify.

## Current status (~70%)

| Area | Status |
|------|--------|
| Homepage | ✅ Video hero, collections, reviews, wholesale CTA |
| Shop / collections | ✅ Bowlz, Bongz, Cleaning + color swatches |
| Product pages | 🟡 PDP live; needs full Shopify variant UX |
| Cart / checkout | ✅ Shopify cart drawer |
| Age verification | ✅ 21+ gate on all pages |
| Wholesale / Contact | 🟡 Pages exist; forms use mailto |
| Policies | 🟡 On PDP accordion; need standalone pages |
| Account / Blog / Search | ❌ Links out to Shopify |
| SEO (sitemap, OG, JSON-LD) | ❌ Not yet |
| Analytics | ❌ Not yet |

---

## Phase 1 — Core shopping (current sprint)

**Goal:** Browse → PDP → cart → checkout works on custom domain.

- [x] Header with logo, Shop dropdown, cart
- [x] Age gate (21+)
- [x] Collection pages with color swatches
- [x] PDP: gallery, buy box, policies, sizing guide, FAQ
- [x] PDP: Color + Size selectors (match live site)
- [x] PDP: Full product description from Shopify
- [x] Internal policy pages (`/policies/*`)
- [x] Fix cart upsell (Swabz variant)
- [ ] Configure Shopify env on Vercel
- [x] `not-found`, `sitemap`, `robots`

---

## Phase 2 — Content parity (bowlzofficial.com)

**Content pulled from live site:**

### Homepage
- Promo: *20% off magnetic glass + free OG bowl*
- Collection tiles: Bowlz, Bongz (20% off), Swabz
- Wholesale CTA: *Got a Smokeshop or Dispensary?*

### Product page (The OG 14mm example)
- Price: $35 (was $50)
- Options: Color (Black Mamba), Size (14mm)
- Bullets: fits 14mm, half gram, one-wipe clean, shatterproof, food-grade, airtight, magnets
- Policies: Shipping, Warranty & Exchanges, Returns (copy in `content.ts`)
- Bowl Sizing Guide (penny test)
- Ask a question form

### Trust signals
- 50,000+ customers, 4.9★, 1,000+ reviews
- Free shipping $75+
- Ships USA; 30-day warranty/exchange window

- [ ] Replace all Nova Triggers leftover copy
- [ ] Newsletter → Klaviyo or Shopify Email
- [ ] Contact / wholesale → server action or Formspree
- [ ] Reviews app (Judge.me) or expanded static reviews
- [ ] Blog proxy or headless articles

---

## Phase 3 — Launch polish

- [ ] Open Graph + Product JSON-LD
- [ ] `generateStaticParams` for all product handles
- [ ] Shopify-driven collections (replace static `content.ts` grid)
- [ ] Search (Shopify predictive)
- [ ] Customer account (Shopify Customer Account API)
- [ ] Analytics (GA4, Meta Pixel) + cookie consent
- [ ] Performance: hero video poster, image audit
- [ ] Safe-area padding on mobile sticky ATC

---

## Phase 4 — Go live

1. Point `bowlzofficial.com` DNS to Vercel
2. Set env vars: `SHOPIFY_STORE_DOMAIN`, storefront token, admin token
3. Smoke test all 12 product handles + checkout
4. Enable age gate in production
5. Submit sitemap to Google Search Console

---

## Product catalog (12 handles)

**Bowlz:** platinum, v3-18mm, bowlz-v2, xl-pre-order, faceted, swabz  
**Bongz:** tubez, beakerz, percs, base, tubez-replacement-neck, replacement-glass-downstem  
**Cleaning:** swabz

---

## Local development

```bash
rm -rf .next && npm run dev
# http://localhost:3000
```

Avoid running `npm run build` while `npm run dev` is active on the same project.
