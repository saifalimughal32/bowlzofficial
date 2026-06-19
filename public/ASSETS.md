# Drop your assets here

## Images

```
/public/images/
  hero.jpg              ← Homepage hero (4:5 portrait, warm lifestyle)
  /benefits/
    cordless.jpg
    heat-levels.jpg
    massage.jpg
    discreet.jpg
  /reviews/
    mia.jpg
    karen.jpg
    destiny.jpg
    jessica.jpg
    alicia.jpg
    taylor.jpg
  /gallery/
    1-hero.jpg
    2-on-body.jpg
    3-controls.jpg
    4-scale.jpg
    5-packaging.jpg
```

Then update paths in `src/data/content.ts` (reviews, benefits) and pass `src` props to ImageSlot components.

## Videos (UGC / TikTok-style)

```
/public/videos/
  ugc-office.mp4
  ugc-morning.mp4
  ugc-unboxing.mp4
```

Then update `videoSrc` in `src/data/content.ts` → `ugcClips` array.

Example: `videoSrc: "/videos/ugc-office.mp4"`
