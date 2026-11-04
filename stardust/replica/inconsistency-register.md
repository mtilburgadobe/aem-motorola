# Inconsistency register — motorola.com replica

Pure replica. No audit was requested and no --register file was supplied; the only
permitted design deltas are entries below (one, not visual).

cap-probe surfaced single-module caps (newsletter form 740px, home grid text 535px,
razr-fold topArea 1020px, hero2 headline 440px) and a contentMaxWidth difference between
archetypes (1920 vs fluid). These are recorded as the source's own sizing and are
REPLICATED as captured, not registered as changes.

## 1. hidden page-title h1

- **Evidence:** every captured source page (`stardust/current/pages/<slug>.html`) ships one
  page-title `<h1 style="height: 0;width: 0;overflow: hidden;">` before the first module. It
  carries text on 3 pages — at-de-homepage "Motorola Home Page", at-de-motocare
  "Moto Care-Seite", at-de-motoverse "Motoverse-Seite" — and is EMPTY on the other 7. The
  delivered EDS pages had no `<h1>` at all on 8/10 (at-de-brilliant-collection and
  at-de-business-edition already render an authored module h1), failing
  `stardust/scripts/rollout/verify.mjs` (exactly one `<h1>` per page).
- **Minimal change:** a `page-title` block (first block of the first, metadata-only section;
  no new section) holding one visually hidden h1 (sr-only clip pattern; block, wrapper and
  section add zero height). Text = the source h1 text where present, else the page's captured
  title verbatim (`stardust/current/pages/<slug>.json` `title`; the capture's html `<title>` is
  the placeholder "Document"). No text invented. Pages with an authored h1 are left alone.
  - index → "Shop 5G smartphones, Tablets, Accessories and Smart Devices | Motorola US" (title)
  - at-de-homepage → "Motorola Home Page" (source h1)
  - at-de-motocare → "Moto Care-Seite" (source h1)
  - at-de-motoverse → "Motoverse-Seite" (source h1)
  - at-de-brilliant-collection-2026 → "Das motorola razr 70 kaufen | Premium-Smartphone | Flip-Smartphone | motorola AT" (title)
  - at-de-offers → "offer | motorola AT" (title)
  - at-de-contest → "Motorola AT FIFA: Erlebe die FIFA Fussball-Weltmeisterschaft 2026™ vor Ort. | motorola AT" (title)
  - at-de-razr-fold-fifa-world-cup-edition → "motorola razr fold FIFA Edition Smartphone | motorola razr fold, Teil der FIFA World Cup 26™ Collection | motorola AT | motorola AT" (title)
  - at-de-brilliant-collection, at-de-business-edition → unchanged (authored h1)
- **Visual effect:** none intended; proven by re-gating all 10 pages at 1440 and 360.
- **Status:** applied
