# Nova Triggers — Shopify Setup Guide

## Phase 1: Theme (Day 1)

- [ ] Upload `theme/` folder to Shopify (CLI or zip)
- [ ] Publish theme
- [ ] Upload hero image in **Hero** section
- [ ] Upload demo video in **Video demo** section
- [ ] Verify all sections appear on homepage and product page

## Phase 2: Product & Offers (Day 1–2)

- [ ] Create single product with 5+ images
- [ ] Install bundle app (Kaching Bundles recommended)
- [ ] Configure pricing:
  - 1 Pad: $49 (compare $79)
  - 2 Pads: $79 (compare $98) — **default selected**
  - 3 Pads: $99 (compare $147)
- [ ] Add free travel pouch as automatic gift on 2+ orders (optional)

## Phase 3: Trust & Checkout (Day 2)

- [ ] Enable Shop Pay, PayPal, Apple Pay, Klarna
- [ ] Free shipping over $49 (USA only to start)
- [ ] Create Shipping, Returns, Contact pages
- [ ] Add footer policy links
- [ ] Set support email: hello@novatriggers.com

## Phase 4: Reviews & Social Proof (Day 2–7)

- [ ] Install Judge.me or Loox
- [ ] Import/seed 50+ reviews with photos before ad spend
- [ ] Enable review request emails post-delivery
- [ ] Collect UGC video reviews for product page + ads

## Phase 5: Conversion Apps (Day 3–5)

- [ ] Cart drawer: theme includes basic drawer; enhance with Slide Cart or similar if needed
- [ ] Klaviyo: connect store, build 3-email abandonment flow
- [ ] Post-purchase upsell: AfterSell one-click extra pad at $30

## Phase 6: Pre-Launch QA

- [ ] Mobile: sticky ATC works, bundle selector tappable
- [ ] Page speed: compress images, target <3s load
- [ ] Test full checkout on mobile (Shop Pay + card)
- [ ] Verify guarantee copy on cart + product page
- [ ] Spell-check all copy; confirm no medical claims

## Phase 7: Ads Ready

- [ ] Product page URL for ads: `/products/period-heating-pad`
- [ ] Meta Pixel + TikTok Pixel installed
- [ ] UTM parameters on ad links
- [ ] Match ad hook to hero headline for message continuity

## Bundle selector → Shopify variants

After creating variants, update `product-main.liquid` form to pass selected variant ID based on bundle radio selection. Example JS addition:

```javascript
bundleInputs.forEach(function (input) {
  input.addEventListener('change', function () {
    var variantId = input.dataset.variantId; // set in Liquid per variant
    document.querySelector('#product-form input[name="id"]').value = variantId;
  });
});
```

In Liquid, output `data-variant-id="{{ variant.id }}"` on each bundle option when looping product variants.

## Cart optimization reminders

- Show free-shipping progress bar in cart drawer
- Display estimated delivery: "Arrives in 3–7 business days"
- Repeat 30-Night Guarantee in cart and checkout
- Enable accelerated checkout buttons above fold on product page

## Email flows (Klaviyo)

1. **Abandoned cart (1hr):** "Your soothing relief is waiting" + guarantee
2. **Abandoned cart (24hr):** Social proof + FAQ objection handling
3. **Abandoned cart (72hr):** Final reminder, no fake urgency
4. **Post-purchase:** How to use + review request after first cycle
