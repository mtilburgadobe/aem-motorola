<!-- stardust:provenance
  writtenBy: stardust:extract
  writtenAt: 2026-11-03T13:49:07Z
  readArtifacts:
    - stardust/current/pages/*.html (<link rel=stylesheet>, inline molecule dictionary)
    - stardust/.work/css/* (downloaded live stylesheets)
    - stardust/current/_computed-styles.json
  synthesizedInputs: []
  stardustVersion: 0.36.1
-->
# CSS lift notes — motorola.com (US index + AT/de)

Lifted values for the recreation step. Computed values come from `_computed-styles.json` (census, 1440 and 360); authored values from the live CSS saved in `stardust/.work/css/` (`NN-<basename>`; the URL list is `stardust/.work/css/urls.txt`).

## Stylesheets (21 unique URLs across 10 pages)

| file | URL | role |
|---|---|---|
| 01 | https://c1-ofp.static.pub/SystemFragment/moto/fonts/moto-font-css.eb9b705e514d2e18.css | @font-face: Montserrat (5 subsets × 400/500/700), Gotham, MotoSans |
| 02 | https://c1-ofp.static.pub/SystemFragment/moto/moto-head.97181a0c717c5e85.css | global font-family var(--atom-typo-moto-font-family,'Montserrat') |
| 03 | https://c1-ofp.static.pub/t_/de_at/version/batch/ids/2859b0b2ce1661ca69d37d20c6cd59aa_5491a177ce491c3c45a87779e8e53dfe_63e775c82bed560d06f94bb7b71dbbe9_8476e24c244724b33210328b655e04f2_ef3411d2c084e13d0b646c282d9ece4e.css | per-page component batch |
| 04 | https://c1-ofp.static.pub/t_/en/SystemFragment/iconfont/style.084f3cf496a452ad.css | icomoon @font-face + .iconfont-* glyph map |
| 05 | https://c1-ofp.static.pub/t_/en/version/batch/ids/212b48dea241d0083aff4bb782130ff5_23bd66a6ac9a1ca297fb59e33c0046fc_6a3334431fdd2b740910200a82fcca8b_9264586bcb73852e291b28a80bcce3b0_9e50d96028ab921606cafae9c8b89499_afd48b65156f2bfef383932341fc1e04_e5d8d906b508908966e0b5a5d10ce90d_ed554a5cce4a46666888f4a4eac3b542_ef3411d2c084e13d0b646c282d9ece4e.css | per-page component batch |
| 06 | https://c1-ofp.static.pub/t_/en/version/batch/ids/5491a177ce491c3c45a87779e8e53dfe_55a50f49af1abc336c81a1ad0866d92f_8f6873815722adc27030b9bf0f31a8bb_9e50d96028ab921606cafae9c8b89499_afd48b65156f2bfef383932341fc1e04_b3c1e9b701699759b5419ee97db0e739_ed554a5cce4a46666888f4a4eac3b542_ef3411d2c084e13d0b646c282d9ece4e.css | per-page component batch |
| 07 | https://c1-ofp.static.pub/t_/en/version/batch/ids/5491a177ce491c3c45a87779e8e53dfe_5f8c312522bf0241e1153906d41b97e8_8476e24c244724b33210328b655e04f2_8d73bfdc3dec44146bbbf91e2e0d60cf_9264586bcb73852e291b28a80bcce3b0_9e50d96028ab921606cafae9c8b89499_ac39382abd5eb6955949ea8193e2b4e1_afd48b65156f2bfef383932341fc1e04_e5d8d906b508908966e0b5a5d10ce90d_ef3411d2c084e13d0b646c282d9ece4e.css | per-page component batch |
| 08 | https://c1-ofp.static.pub/t_/en/version/batch/ids/8476e24c244724b33210328b655e04f2_cb8a49ae030c8877a1b123995e6fe5bf_e5d8d906b508908966e0b5a5d10ce90d_f228766184b18372165f133cf0d470ee.css | per-page component batch |
| 09 | https://c1-ofp.static.pub/t_/en/version/css/7c5b42f34866f9dcf685f8a6d9a2bd09.css | global shared, all pages (header .navigation-header-pc rules) |
| 10 | https://c1-ofp.static.pub/t_/en/version/css/9be1bfbaf97472b7acd91cc6a70ad9dd.css | shared (index, AT homepage/offers/contest) |
| 11 | https://c1-ofp.static.pub/t_/en/version/css/c069b044002d34ea491d642ae3f468aa.css | global shared, all pages (footer .moto-footer rules) |
| 12 | https://c1-ofp.static.pub/t_/en_gb/version/batch/ids/23d01f9bcf6795dd01525f5ce5a960ca_b9bc0678c4fab0544db7136f2505af2b_cb8a49ae030c8877a1b123995e6fe5bf.css | per-page component batch |
| 13 | https://c1-ofp.static.pub/t_/en_gb/version/batch/ids/7be28a97a48eadddde7642c9fb42e6e4_b3c1e9b701699759b5419ee97db0e739_e5d8d906b508908966e0b5a5d10ce90d.css | per-page component batch |
| 14 | https://c1-ofp.static.pub/t_/en_gb/version/batch/ids/9be1bfbaf97472b7acd91cc6a70ad9dd_c64c54a706f47f030e6185eac2ee7928_c76510dcfcda1db284e235539a80bfa2_ef3411d2c084e13d0b646c282d9ece4e.css | per-page component batch |
| 15 | https://c1-ofp.static.pub/t_/en_us/version/batch/ids/01e0d14dcc3e8b95dadccba78be5bfa5_0419e577175a5e73ffc810e43fb30376_2d51e6fafd194ea4967d28c121955cb5_6a3334431fdd2b740910200a82fcca8b_b9bc0678c4fab0544db7136f2505af2b_c3db3366eefdc62bd408dd191df63bdb_cb8a49ae030c8877a1b123995e6fe5bf_f228766184b18372165f133cf0d470ee.css | per-page component batch |
| 16 | https://c1-ofp.static.pub/t_/es_es/version/batch/ids/01e0d14dcc3e8b95dadccba78be5bfa5_0419e577175a5e73ffc810e43fb30376_2d51e6fafd194ea4967d28c121955cb5_6a3334431fdd2b740910200a82fcca8b_b9bc0678c4fab0544db7136f2505af2b_c3db3366eefdc62bd408dd191df63bdb_cb8a49ae030c8877a1b123995e6fe5bf_f228766184b18372165f133cf0d470ee.css | per-page component batch |
| 17 | https://c1-ofp.static.pub/t_/es_es/version/css/c069b044002d34ea491d642ae3f468aa.css | global shared, all pages (footer .moto-footer rules) |
| 18 | https://c1-ofp.static.pub/version/css/0100d270707ea8504db51a0754304562.css | page/component CSS |
| 19 | https://c1-ofp.static.pub/version/css/736632d0ab90c1920e079b49c77302d9.css | page/component CSS |
| 20 | https://c1-ofp.static.pub/version/css/c99918a9c247166ea75d9e60a73dbe98.css | page/component CSS |
| 21 | https://j1-ofp.static.pub/SystemFragment/moto/swiper_11/swiper-bundle.min.css | Swiper 11 carousel + swiper-icons data-URI font |

Most component CSS is NOT in these files: each page carries ~125 inline `<style>` blocks plus an inline JSON molecule dictionary (`"typo-*"`, `"btn-*"` → `[data-molecule="…"]` rules) built on ~2,179 `--atom-*` utility custom properties.

## Fonts

- Montserrat: Google-Fonts variable woff2 (wght 100–900), 5 unicode-range subsets, declared three times each as single weights 400 / 500 / 700. No `font-display`. Local copies are in `stardust/current/assets/fonts/montserrat-{latin,latin-ext,cyrillic,cyrillic-ext,vietnamese}.woff2`. Licence: OFL.
- **Weight 600 renders as 700.** h1 and h2 compute to `font-weight: 600`, but no 600 face is declared, so the browser picks the 700 face and clamps it. To match the site, keep the 400/500/700 single-weight rules. Declaring `font-weight: 100 900` would make 600 lighter than the live site.
- icomoon (`assets/fonts/icomoon.woff2`, `font-display: block`): `.iconfont-plus::before` is `\e929`; `.iconfont-arrowDown::before` is `\e91c`.
- Gotham and MotoSans are declared but never load (all 20 measurements report them unloaded). Both are licensed faces and were not downloaded.

## Type ramp: computed (census weighted score, Montserrat)

| level | 1440 | 360 | evidence |
|---|---|---|---|
| h1 (visible, rare) | 40px / 600 / normal | 40px / 600 (business-edition); 36/600/40 (brilliant) | 2 visible h1s; 8 pages use a 0×0 hidden SEO h1 |
| h2 (section/hero display) | 48px / 600 / 56px (26×) | 28px / 600 / 32px (23×) | `typo-headline-h2-dt`; hero displays 56–76px/600 on program pages |
| h3 (product card title) | 22px / 700 / 28px (50×) | 16px / 700 / 16px (50×) | contest/offers/homepage cards; 24/700/32 on AT home cards (→18/700/24) |
| h4 (promo tile) | 36px / 700 / 40px (AT), 32px / 700 / 40px (US) | 24px / 700 / 40px | "Find your edge" tiles |
| body | 16px / 400–500 / 24px | 16px / 400–500 / 24px | `typo-body-l-dt` |
| body-xl (tile subline) | 18px / 500 / 24px | 18px / 500 / 24px | `typo-body-xl-dt` |
| small / legal | 12px / 400 / 16px; footer links 14px/18px | 10–12px | `typo-body-s-dt`, `.footer-links-accordion-link` |

Letter-spacing is `normal` everywhere except one program-page h2 (−0.4px at 360) and brilliant-collection-2026 at 360 (−0.672px on 28px h2s).

## Type ramp: authored molecule dictionary (index.html inline)

| molecule | desktop | 320–600 | 768–1024 |
|---|---|---|---|
| typo-headline-h0-dt | 100/84 | 48/40 | 48/40 |
| typo-headline-h1-dt | 56/64 | 36/40 | 36/40 |
| typo-headline-h2-dt | 48/56 | 28/32 | 28/32 |
| typo-headline-h3-dt | 40/48 | 24/24 | 24/24 |
| typo-headline-h4-dt | 32/40 | 24 | 24 |
| typo-title-l-dt | 28/32 | 20/24 | 20/24 |
| typo-title-m-dt | 24/32 | 18/24 | 18/24 |
| typo-body-xl-dt | 18/24 | — | — |
| typo-body-l-dt | 16/24 | — | — |
| typo-body-m-dt | 14/20 | — | — |
| typo-body-s-dt | 12/16 | — | — |

The molecule media queries leave a gap between 601px and 767px, where desktop values apply.

## Buttons (molecules + census)

| variant | bg / text / border | radius | padding 1440 → 360 | type 1440 → 360 | hover |
|---|---|---|---|---|---|
| btn-primary-solid-dark-dt | #131417 / #fff / none | 100px | 12px 24px → 6px 12px (min-h 32) | 16/500 uppercase → 12px | bg #333333; focus #454545 |
| btn-primary-solid-light-dt | #fff / #131417 / none | 100px | 12px 24px → 6px 12px | 16/500 uppercase → 12px | bg #e5e5e5 |
| btn-secondary-outline-dark-dt | transparent / #131417 / 1px #131417 | 100px | 12px 24px → 6px 12px | 16/500 uppercase → 12px | — |
| btn-secondary-outline-light-dt | transparent / #fff / 1px #fff | 100px | 12px 24px → 6px 12px | 16/500 uppercase | — |
| 768–1024 for all -dt buttons | | | 8px 36px, 14px, min-h 42 | | |
| US razr CTA (local) | #384ddd / #f1f5f8 / 1px #0e77da | 100px | — | — | bg #0e77da |
| motoverse chip (local) | transparent / #fff / 1px #fff | 27px | 20px 30px → 6px 13px | 18/400 uppercase → 12px | — |
| newsletter submit | #001428 / #fff | 0 24px 24px 0 | 10px 50px | 16/400 | — |
| tab (#trending-v2) | #fff / #000 (active) / #595959 | 0 | 10px 12px | 16/700 | — |

## Header / footer

- Header: `header.navigation-header-pc` is `position: fixed`, `top: 0`, `z-index: 1134`, `#fff`, and **88px tall at both 1440 and 360**. It has two rows:
  - Announcement bar `.navbar-wrapper-small-banner`: `#e9eaf2`, min-height 19px, centred, bold link `#384ddd`.
  - Nav row `.navigation-topbar-pc`: `max-width: 1464px`, `margin: 0 auto`, flex. Logo PNG is 40×40 at x20/y34. `.navigation-nav` has `margin-left: 18px` and `gap: 16px`. Each item has `padding: 0 8px`, `min-height: 69px` and `font-weight: 700`, and opens a mega menu (`.mega-menu-pc`).
- Footer: `footer .moto-footer.pc.moto-footer-light-theme` has a `#fff` background, text `#001428` and `padding: 20px`. The `.container` rule sets `max-width: 1170px` in CSS. Heights are 665px at 1440 and 890px at 360 (AT); the US footer is 656px and 840px.
  - The base footer CSS is the dark theme (`--atom-color-bg-cta`, white links `#d2d2d2` 12/300). The light theme overrides it, leaving behind `rgba(255,255,255,.3)` borders that cannot be seen.

## Containers (CSS-declared; cap-probe owns the measured model)

- Header topbar: 1464px. Footer container: 1170px. `main` sections are full-bleed (1435px at a 1440 viewport, because the scrollbar takes 5px).

## Key colours

#000 text · #fff ground · #131417 CTA ink · #e9eaf2 tile/bar ground · #001428 navy footer text · #0d5c91 card link · #cccccc footer rule · #384ddd announcement link. The logo PNG is #685bc6. #cf4039 belongs to the third-party feedback tab and should be ignored.
