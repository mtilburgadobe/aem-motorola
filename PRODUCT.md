<!-- stardust:provenance
  writtenBy: stardust:extract
  writtenAt: 2026-11-03T13:52:48Z
  readArtifacts:
    - stardust/current/_brand-extraction.json
    - stardust/current/_computed-styles.json
    - stardust/current/pages/*.json
    - stardust/current/pages/*.html
    - https://www.motorola.com/
  synthesizedInputs: []
  stardustVersion: 0.36.1
-->
# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

_provenance: inferred. Based on navigation, CTAs and page copy across the 10 captured pages._

Consumers comparing and buying Motorola smartphones and accessories. The captured set covers the US English storefront (`/us/en/homepage`) and the Austrian German storefront (`/at/de/…`, 9 pages). The site also addresses two secondary audiences:

- Business buyers, through `für unternehmen` / `business-edition` and the US `business` menu.
- Existing owners, through moto care, support, software updates and repair status.

## Product Purpose

Motorola's official direct-to-consumer storefront and brand site, which describes itself in the footer as "Offizielle Website" / "Official Website". The site:

- launches and merchandises devices (motorola signature, razr, edge, moto g, moto e, thinkphone, moto buds/watch/tag);
- runs time-bound campaigns ("Black Friday – Angebot entdecken", "holiday deals leaked early…", the FIFA World Cup edition, a contest);
- sells protection and services (Moto Care).

Success means a product-detail visit or a purchase. "Jetzt kaufen" (Buy now) is the most frequent CTA across the crawl: 65 occurrences on 6 pages.

## Positioning

_provenance: inferred. Based on captured copy._

The site positions the brand on design-led hardware through partnerships with Pantone ("Pantone™-Farbe des Jahres 2026"), Swarovski ("Brilliant Collection") and FIFA ("The official smartphone partner of FIFA"). It sells that hardware with direct-store perks such as gifts with purchase and exclusive offers ("Die smartere Art einzukaufen – Kaufe auf motorola.com und hol mehr aus deinem Gerät heraus").

## Capabilities and Constraints

- The site is a commerce platform owned by Lenovo. Product cards show live prices, colour swatches and "Produktdatenblatt" links. The header has a mega-menu with product cards, a sign-in link ("Anmelden / Konto erstellen") and a country selector.
- Page types in this capture:
  - landing: index, at-de-homepage
  - program: brilliant-collection ×2, razr-fold-fifa-world-cup-edition
  - campaign: offers, contest
  - static: motocare, business-edition, motoverse
- Each locale has its own header navigation and footer IA:
  - AT: 6 nav items, 4 footer columns
  - US: 6 different nav items, 6 footer columns
- Third-party layers:
  - Evidon consent banner
  - Confirmit "Rückmeldung" feedback tab (`#cffbtb`)
  - newsletter modal and band on the home pages
- Dynamic data is loaded from `api.motorola.com`. See `pages/*.json#dynamic`.

## Brand Commitments

- **Register:** `brand` (marketing/storefront). Every page leads with a hero, offers and product carousels, and needs no sign-in to view.
- **Name & marks:** Motorola, with the stylised "M" in a circle. The header logo is a 200×200 PNG drawn at 40×40, colour #685bc6. Product and campaign names are written in lowercase ("motorola razr 70", "die brilliant collection", "moto g").
- **Personality observed:** confident, design-forward, offer-driven and minimal in chrome. The UI is black and white so that product photography and partner colours carry the brand. German copy addresses the reader informally with "du" ("Entdecke", "Manage deinen Tag stylisch").
- **Type identity:** Montserrat throughout. Headlines use weight 600 (which renders as 700); CTAs are uppercase with weight 500.
- **Observed anti-references:** _provenance: inferred._ No gradients or decoration on UI chrome. No coloured brand buttons; CTAs are near-black or white pills. Product and campaign names are never set in uppercase headlines.

## Evidence on Hand

- Page records and rendered DOM: `stardust/current/pages/<slug>.json` and `.html` (10 pages)
- Computed-style census at 1440 and 360: `stardust/current/_computed-styles.json`
- Brand surface: `stardust/current/_brand-extraction.json`
- CSS lift table: `stardust/current/_css-lift-notes.md`
- Logo: `stardust/current/assets/logo.png`. Favicon: `stardust/current/assets/favicon.ico`
- Fonts:
  - Montserrat variable woff2 subsets, 5 files: `stardust/current/assets/fonts/montserrat-*.woff2`
  - icomoon icon font: `stardust/current/assets/fonts/icomoon.woff2`
- Hero image (US index): `stardust/current/assets/media/hero-index-1tlti15i.png`
- Screenshots: `stardust/current/assets/screenshots/*-thumb*.png`
- Absent:
  - No testimonials, press or case studies were captured.
  - No SVG logo was captured.
  - Gotham and MotoSans are declared in the CSS but never rendered, and were not captured.

## Product Principles

_provenance: inferred. Based on recurring layout and copy patterns._

1. Product photography leads. The UI stays black, white and pale lavender-grey (#e9eaf2).
2. Every merchandising surface ends in a purchase path, usually two pills: learn more (outline) and buy now (solid).
3. Campaigns layer on top of a stable shell. The announcement bar and hero carousel change with the season; the header and footer stay the same.
4. Each locale gets its own IA and copy. The visual system is shared.

## Accessibility & Inclusion

Observed facts:

- 68.6% of captured images (604 of 881) have empty `alt`. 17 images use generic alt text: "Image" 12×, "logo"/"Logo" 5×.
- Visible page titles are usually `h2`. Most pages ship an `h1` hidden at 0×0 (for example "Motorola Home Page").
- Body text is #000 on #fff, which passes WCAG AA.
- No product-specific accessibility standard was established.
