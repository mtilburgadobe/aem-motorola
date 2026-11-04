<!-- stardust:provenance
  writtenBy: stardust:extract
  writtenAt: 2026-11-03T13:52:48Z
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/_computed-styles.json
    - stardust/current/_css-lift-notes.md
    - stardust/current/pages/*.html (inline molecule dictionary)
  synthesizedInputs: []
  stardustVersion: 0.36.1
  mode: descriptive (current state, not a target)
-->
---
name: Motorola (current state)
description: Motorola's official storefront in a black-and-white Montserrat shell, with pill CTAs and product photography on pale-lavender tiles.
colors:
  ground-white: "#ffffff"
  ink-black: "#000000"
  cta-ink: "#131417"
  tile-lavender: "#e9eaf2"
  footer-navy: "#001428"
  card-link-blue: "#0d5c91"
  rule-grey: "#cccccc"
  banner-link-blue: "#384ddd"
  cta-hover-grey: "#333333"
  logo-purple: "#685bc6"
typography:
  display:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "48px"
    fontWeight: 600
    lineHeight: "56px"
    letterSpacing: "normal"
  headline:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: "40px"
    letterSpacing: "normal"
  title:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: "28px"
    letterSpacing: "normal"
  body-xl:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "18px"
    fontWeight: 500
    lineHeight: "24px"
  body:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  small:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: "16px"
  label:
    fontFamily: "Montserrat, sans-serif"
    fontSize: "16px"
    fontWeight: 500
    lineHeight: "normal"
rounded:
  tile: "16px"
  pill: "100px"
  chip: "27px"
  small: "4px"
  round: "50%"
spacing:
  nav-gap: "16px"
  footer-pad: "20px"
components:
  button-primary:
    backgroundColor: "{colors.cta-ink}"
    textColor: "{colors.ground-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.cta-hover-grey}"
  button-primary-light:
    backgroundColor: "{colors.ground-white}"
    textColor: "{colors.cta-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-secondary:
    textColor: "{colors.cta-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  product-card:
    backgroundColor: "{colors.tile-lavender}"
    rounded: "{rounded.tile}"
  announcement-bar:
    backgroundColor: "{colors.tile-lavender}"
    textColor: "{colors.banner-link-blue}"
  site-header:
    backgroundColor: "{colors.ground-white}"
    textColor: "{colors.ink-black}"
    height: "88px"
  site-footer:
    backgroundColor: "{colors.ground-white}"
    textColor: "{colors.footer-navy}"
    padding: "20px"
  newsletter-submit:
    backgroundColor: "{colors.footer-navy}"
    textColor: "{colors.ground-white}"
    padding: "10px 50px"
---

# Design System: Motorola (current state)

## Overview

**Creative North Star: "The Gallery Counter"**

The site is a white gallery wall with a sales counter in front of it. Chrome is reduced to black type on white, with one pale lavender-grey (#e9eaf2) that grounds product tiles and the announcement bar. Colour comes almost entirely from photography and partner campaigns: Pantone, Swarovski and FIFA. Montserrat is the only typeface in use. Headlines are set at weight 600, which renders as 700, and run large (48px section headers, 56–76px on program pages). Product and campaign names are written in lowercase.

Density changes by page type:

- **Landing and campaign pages** stack full-width swiper carousels: a hero banner, product-card rows and 2-up promo tiles.
- **Program pages** (Brilliant Collection, razr fold FIFA edition) are full-bleed editorial sequences of 720–1027px sections.

Every merchandising unit ends in a pair of pills: an outline "learn more" and a solid near-black "buy now".

The system lives in authored "molecules" (`typo-*`, `btn-*` on `[data-molecule]`) built from roughly 2,179 single-value `--atom-*` custom properties. There are no semantic tokens. Program pages add their own local variants (20px and 27px radii, 12px uppercase buttons).

**Key Characteristics:**
- Montserrat only: 600/700 headlines, 400/500 body, CTAs in uppercase at 500.
- Black/white UI with #131417 near-black pill CTAs (100px radius).
- Product imagery on #e9eaf2 tiles with a 16px radius and a soft 0 2px 4px shadow.
- Fixed white 88px header: a 19px #e9eaf2 announcement bar above a 69px nav row with mega menus.
- Lowercase product naming. Headings are almost never uppercase (2%).

## Colors

The palette is near-monochrome, so photography and partner campaigns supply the colour.

### Primary
- **CTA Ink** (#131417): fill of solid primary pills ("JETZT KAUFEN", "BUY NOW"), and text/border of outline pills. Source token: `--atom-color-dark-300`. Hover is #333333; focus is #454545.

### Secondary
- **Footer Navy** (#001428): footer headings and links, some body copy, and the fill of the newsletter submit button (`--atom-color-navy-950`). Weight 365, the largest of any non-neutral colour.

### Tertiary
- **Card Link Blue** (#0d5c91): the secondary text link on product cards. Used only as text.
- **Banner Link Blue** (#384ddd): the bold link in the announcement bar on both locales, and the fill of the US razr CTA (hover #0e77da).

### Neutral
- **Ground White** (#ffffff): page, header and footer background.
- **Ink Black** (#000000): default text, headings and links.
- **Tile Lavender** (#e9eaf2): the announcement bar and product-tile grounds. The same hue at 30% forms a gradient wash on Brilliant panels.
- **Rule Grey** (#cccccc): the footer divider.

### Named Rules
**The Photography-Carries-Colour Rule.** UI chrome stays black, white and lavender-grey. Saturated colour shows up only in images, product swatch dots and partner campaigns.

Logo purple (#685bc6) exists only inside the logo PNG. The red #cf4039 belongs to a third-party feedback tab and is not part of the brand.

## Typography

**Display Font:** Montserrat (with sans-serif)
**Body Font:** Montserrat (with sans-serif)

**Character:** One geometric sans covers everything. Headlines are heavy, CTAs are uppercase with tracking left at normal, and product names are lowercase. The result reads as tech-retail and confident.

Montserrat ships as a variable woff2 (wght 100–900) in 5 unicode-range subsets. The CSS declares it only at 400, 500 and 700, so every 600 heading renders at 700. Gotham and MotoSans are declared too but never load.

### Hierarchy (computed, 1440 → 360)
- **Display** (600, 48px/56px → 28px/32px): section and hero headlines (`h2.typo-headline-h2-dt`, 26× at 1440). Program-page heroes run 56–76px at 600.
- **Headline** (700, 36px/40px → 24px/40px): 2-up promo tile titles (`h4`). The US renders these at 32px.
- **Page title** (600, 40px → 40px): the rare visible `h1` (business-edition). Most pages hide their h1.
- **Title** (700, 22px/28px → 16px/16px): product-card names (`h3`, 50×). AT home cards use 24/32, dropping to 18/24 at 360.
- **Body XL** (500, 18px/24px): tile sublines (`typo-body-xl-dt`).
- **Body** (400–500, 16px/24px): paragraphs (`typo-body-l-dt`).
- **Small** (400, 12px/16px; footer links 14px/18px): legal text and captions.
- **Label** (500, 16px → 12px, uppercase): pill CTAs.

The authored molecule ramp is h0 100, h1 56, h2 48, h3 40, h4 32, title-l 28, title-m 24, then body 18/16/14/12. Mobile overrides apply at 320–600px and tablet overrides at 768–1024px. The scale is ad-hoc, not modular.

### Named Rules
**The Lowercase-Names Rule.** Product and campaign names stay lowercase ("motorola razr 70", "die brilliant collection"). Uppercase is reserved for CTA labels, which are transformed by CSS.

## Layout

- Sections in `main` are full-bleed (1435px at a 1440 viewport, after the scrollbar). Each section is a carousel or full-width image band, typically 600–1000px tall at 1440.
- The header's nav row is capped at `max-width: 1464px`. The footer container is capped at `max-width: 1170px` in CSS.
- The header is `position: fixed` and 88px tall at both 1440 and 360.
- Landing and campaign pages stack these sections: hero swiper → product-card swiper rows (4 visible at 1440) → 2-up promo tiles → tabbed "find your perfect match" → newsletter band (home pages only).
- Program pages stack full-bleed editorial bands.
- Molecule breakpoints are 320–600px and 768–1024px. Between 601px and 767px the desktop values apply.

## Elevation & Depth

Elevation is mostly flat. Depth comes from photography and from black scrims laid over imagery. One soft shadow appears on product and card tiles.

### Shadow Vocabulary
- **Tile lift** (`box-shadow: rgba(0, 0, 0, 0.16) 0px 2px 4px 0px`): product and teaser tiles (238× across contest, offers and homepage).
- **US card** (`box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 4px 0px`): US homepage cards (6×).

Scrims:
- `linear-gradient(0deg, rgba(0,0,0,.6), rgba(0,0,0,0))` sits at the bottom of image tiles (238×).
- `linear-gradient(rgba(0,0,0,0) 0%, rgba(0,0,0,.6) 100%)` darkens homepage cards.

## Shapes

- Image tiles and cards use **16px** corners. This is the cross-page mode by both count and area.
- Every molecule button is a **100px pill**.
- Colour-swatch dots and carousel arrows are **50%** circles.
- Small radii appear locally:
  - 4px (20×)
  - 5px (12×)
  - 10px (16×)
  - 20px and 24px on program pages
  - 27px on motoverse chips
  - 30px (30×)
- The newsletter field splits a pill in two: input `24px 0 0 24px`, button `0 24px 24px 0`.

## Components

### Buttons
- **Shape:** full pill (100px).
- **Primary:** #131417 fill, white text, 16px/500 uppercase, `12px 24px` padding. At 360 this drops to 12px with `6px 12px` padding and min-height 32px. At 768–1024 it is 14px with `8px 36px` padding.
- **Primary light:** white fill with #131417 text, used on dark heroes. Hover is #e5e5e5.
- **Secondary:** transparent fill with a 1px #131417 border and #131417 text, same metrics. Paired to the left of a solid primary on product cards ("MEHR ERFAHREN" + "JETZT KAUFEN").
- **Hover / Focus:** dark #131417 changes to #333333; focus is #454545; light #fff changes to #e5e5e5. Transition timing was not captured.

### Cards / Containers
- **Product card:** product photo on a #e9eaf2 ground with 16px corners. It contains:
  - colour-swatch dots (50% circles)
  - an h3 product name at 22px/700, lowercase
  - price
  - a two-pill CTA row
  - a secondary #0d5c91 link ("Produktdatenblatt")
- **Promo tile:** full-bleed photo, h4 at 36px/700, an 18px/500 subline and a pill CTA over a black bottom scrim.

### Inputs / Fields
- **Newsletter:** the input is the left half of a pill (`24px 0 0 24px`, 1px #00264d border). The submit button is the navy (#001428) right half, padded `10px 50px`, 16px/400.

### Navigation
- The header is white and fixed at 88px:
  - A #e9eaf2 announcement bar, min-height 19px, with a centred bold #384ddd link.
  - A 69px nav row, max-width 1464px.
- The logo is a 40×40 PNG at x20.
- Nav items are 700-weight and lowercase ("smartphones", "zubehör", …), spaced with a 16px gap and `0 8px` padding.
- Each item opens a mega menu with a level-2 list and product cards.
- Utility links on the right: support, sign-in.
- AT and US use different item sets:
  - AT: smartphones · zubehör · vorteile · angebote · motoverse · für unternehmen
  - US: smartphones · business · accessories · home devices · videos · software & support

### Footer
- White background with navy #001428 text and 20px padding.
- AT: 4 accordion columns (Produkte, Zubehör, Unterstützung, Über uns), a social row with 5 icons, and "Standort ändern".
- US: 6 columns (Shop Motorola, Featured Products, Accessories & Home, Support, Business & Company, Legal & Policies) and a legal block.

### Hero carousel (signature)
- A Swiper full-bleed slide with an image, an optional product logo, an h2 at 48/600 and one pill CTA, with pagination dots below.
- The US index hero is a single banner (`#razr-fold`). AT uses `#home-single-banner` and the swiper.

## Do's and Don'ts

### Do:
- **Do** set all type in Montserrat, using the three single-weight faces (400/500/700) so that 600 headings render as 700 as they do live.
- **Do** use 100px pills for every CTA: #131417 solid or 1px #131417 outline, 16px/500 uppercase, `12px 24px` padding (`6px 12px` at 12px on mobile).
- **Do** ground product imagery on #e9eaf2 tiles with 16px corners and `rgba(0,0,0,.16) 0 2px 4px`.
- **Do** keep product names lowercase.

### Don't:
- **Don't** introduce coloured CTA fills on the AT pages. The only saturated CTA fill observed is the local #384ddd razr button on the US page.
- **Don't** treat #cf4039 (the third-party feedback tab) or the logo purple #685bc6 as UI colours. Neither appears in brand UI CSS.
- **Don't** uppercase headings. Only 2% of the crawl's headings are uppercase.
