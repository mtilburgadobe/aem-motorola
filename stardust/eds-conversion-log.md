# EDS conversion log — motorola.com replica

## Publish decision (2026-11-03)

Decision: **publish**. Every delivered page, the redirects sheet and the chrome documents (nav, footer and their locale variants) go live on main--0d32c52e--aemcoder.aem.live (deploy-batch.mjs without --no-publish). Decided up front for this hands-off run.

## Decode tiers

Template-slotted for fixed compositions (heroes, banners, chrome); reconstructive for repeat groups (product rails, tiles, cards).

### archetype-static — /at/de/motocare (template static)

- fullbleed (+ `dark` variant): template-slotted — first image = background layer, further image = logo, heading = title, first paragraph without a heading = lead (live `<p><br></p>` spacer modelled as lead margin), lone-link paragraph = CTA.
- media-row: template-slotted — two cells in display order (text cell / media cell); the `--wide` 1980px cap is dropped (section scaffold caps at 1920; no change ≤1920px).
- compare: reconstructive — authored row-major as a genuine data table (5 columns, D10 exception), rendered column-major like the source; section heading is default content reabsorbed (EW8). sr-only "Column 1:" prefixes not carried (decorate adds no words).
- stack: template-slotted generic body (reused by program); media-only content gets `.stack-media`.
- Source has no `<h1>` (hero title is an h2) — outline kept verbatim; delivery-lint P0 h1 is source parity.

## archetype-landing — /at/de/homepage (template landing, archetype at-de-homepage)
- banner (+ `light-text`, `wide`; reusable `static` for campaign): template-slotted — row 1 media (desktop picture, optional ≤600px picture as `.art-mobile`), row 2 text (optional logo pair, heading, copy, CTA paragraphs); media links to the first CTA. D1 🟡 justified: bespoke overlay composition with art direction.
- reco (reusable `deal` class for campaign): reconstructive — cards segment on the repeating h3; leading picture per card, button paragraphs = CTAs (outline gets a generated arrow svg), linked energy-label image + plain link = energy row. block-roundtrip reports 8 🔴 MISSING CTA that are a prototype double-count: the proto nests `span.btn > span.js-link[aria-label|data-href]` inside each `a.reco__cta-wrap`, so it lists 2 CTAs per pill (20) vs 12 authored = rendered; every authored CTA (4×Angebote, 4×Jetzt kaufen, 4×Produktdatenblatt) renders.
- hcar: reconstructive — slides segment on the heading (pictures open the next slide: bg, then logo); static at rest like live (next control inert on live — `home-carousel next` dead); `@variants` slide markers `dark | logo-large` (exempt metadata).
- tiles (+ `shade`): reconstructive — tiles segment on the heading; desktop + ≤768px picture; image links to the tile CTA. D1 🟡 justified: image-overlay tile pair. The live 13px inline size on one tile description is not carried (inline style, not authorable).
- trend: reconstructive — section h2 default content reabsorbed (EW8); tab labels authored as a list (EW7: li tabs, not buttons); tab click moves active state + underline only (live tabs are API-fed).
- gallery: reconstructive — 4 authored slides, 4+4 presentational clones (stripInstrumentation, EW4); autoplay 4 s, hover hold, pause toggle.
- news: template-slotted — headline authored as h2 (live `role=heading aria-level=2`), field label (sr-only label + placeholder), submit label in a div control (EW7), consent + privacy link; no backend (decision D1). D1 🟡 justified: form.
- legal: template-slotted disclosure — head paragraph in a div control row (EW7), fine print hidden until toggled. D1 🟡 justified: disclosure behaviour; reused by program.
- Source has no `<h1>` — none invented; delivery-lint P0 h1 is source parity.
- Energy-label images authored as linked images (`<a><img></a>`) to keep the EU label PDF links.

## static cluster — /at/de/motoverse, /at/de/business-edition (template static, archetype at-de-motocare)
- Variance probe: siblings share no archetype section; only `fullbleed` reused (business-edition hero, new variant `left`: copy confined to the left column, 40px headline — live full_component_text padding-right 829/899px).
- spotlight (new, motoverse): template-slotted — first picture = full-background image (min-height 70vh, cover), further picture = logo in the white 52% badge, heading + paragraphs = the offset copy panel (live moto-flex-content). D1 🟡 justified: image + badge + offset panel composition. ≤540 heading inset doubled (live h2 wraps a padded <p>).
- hub (new, motoverse): reconstructive — one tile per row (picture, title paragraph → role=heading level 2 as live, link list → outline pills); section heading default content reabsorbed (EW8); a single-tile hub renders full width (live full-width-item). D1 🟡 justified: overlay tile grid.
- slider (new, business-edition, live catch-all v3 card variant — `gallery` is the overlay-caption variant and is owned by another unit): reconstructive — section h2 + intro default content reabsorbed; one card per row (picture, title → role=heading level 3, copy); dots + live arrow glyphs move the track one card; no autoplay (live has none). Mobile card width 80% (live JS).
- webform (new): template-slotted form rows (label | placeholder | option words, `@variants` vocabulary); no backend — decision D1, submit shows the status line. Options/placeholder cells `@ew-exempt`. Block id `moto-webform` keeps the FAQ in-page link target.
- faq (new): head row + question|answer rows; question text beside a chevron-only toggle (EW7); all closed at rest as live. D3 🟡 (1-cell head row + 2-cell items) accepted.
- motoverse has no `<h1>` on the source — none invented; delivery-lint P0 h1 is source parity. Out-of-scope hrefs stay absolute on www.motorola.com.

## at-de-contest (campaign sibling, unit campaign)
- banner `static solo` (variant, banner owned by campaign): template-slotted as the archetype; `solo` = live homeCarousel with one slide (553px cover image, copy top-left 7% inset, 50px title, 23px sub, no arrows/dots). D1 🟡 on banner is the archetype's shape.
- copy (new): live moto-flex-content text-only / stackmain heading / html_upload partner list. Template-slotted single body; variants `title`, `fine`, `partners` (heading + band grid). D1 🟡 "default-content candidate" justified: default content is left-aligned 1200px with 16px margins (frozen foundation); the live sections are centred / gridded / banded and need block scope. `stack` (owned by the static unit) styles a grey legal stack, not this.
- reco `deal flush` (variants): `flush` = variance probe delta (padding-top 12 → 0). Deal gains out-of-stock cards: status badge paragraph after the swatches, bold-only notify pill (no backend — D1), unlinked product-sheet label after the energy image.
- Source has no `<h1>` — none invented; delivery-lint P0 h1 is source parity. Out-of-scope hrefs stay absolute on www.motorola.com.

## archetype-program — /at/de/razr-fold-fifa-world-cup-edition (template program)
- subnav (new): template-slotted — logo picture | CTA link; bar turns fixed under the header on scroll (no placeholder, as live; ≤767 pads the body by the bar height). D1 n/a (2 cells).
- pchero (+ `warm`): template-slotted — pictures (desktop, ≤767 poster), video links (desktop, ≤767 .m3u8; `@ew-exempt config`, hidden), heading + copy overlay. restoreAtDelivery: muted looping video plays while ≥25 % in view (native HLS, hls.js fallback). D1 🟡 justified: media stage with video.
- pcarousel: template-slotted by role — first images-only row = wide track, text row = eyebrow/heading/copy, second images-only row = narrow track; one dot set drives both tracks (live synced carousels), no autoplay (live idle-mutation count 0). D1 🟡 justified: synced dual carousel.
- dexp: reconstructive items — text row (heading, copy | background picture), default-stage picture row, item rows (`:icon:` + label | layer picture [+ audio link → play/progress]); icon toggles its layer (.4s fade), second click restores default. Icons are code-bus SVGs (`icons/fifa-*.svg`). D3 🟡 accepted (2-cell text/item rows, 1-cell default-stage row).
- vhero (new): template-slotted — heading, poster picture + video links (in-view autoplay as pchero), detail paragraph; sr-only "Item 1 of 1" as live.
- fullbleed `program` variant (fbleed): existing block, variant-scoped CSS only (body inset 137px, 56px title, outline pill CTA; 800px fill image ≤767).
- cblock (new): template-slotted — picture | heading, copy, action paragraph (link, or `<em>` words → inert role=button pill with arrow, live button has no target; EW7 keeps the paragraph as text host).
- flexview (new): reconstructive — section h2 default content reabsorbed (EW8); one tile per row (caption, CTA link, optional `light` marker | resting + hover pictures); hover/focus swaps the image and reveals the CTA.
- stack: reused unchanged (`.stack-media` logo stack). legal `plain` variant (new, variant-scoped JS branch + CSS): always-open fine print (live moto-flex-content).
- Source has no `<h1>` — none invented; delivery-lint P0 h1 is source parity. Videos play natively (HLS) in current Chrome/Chromium and Safari (verified on the preview: in-view play, out-of-view pause); the hls.js fallback (browsers without native HLS, e.g. Firefox) is blocked by CORS on aem.page/aem.live — assets.motorola.com allows only www.motorola.com — so those keep the poster until served from that origin.

## program cluster — /at/de/brilliant-collection-2026, /at/de/brilliant-collection (template program, archetype at-de-razr-fold-fifa-world-cup-edition)
- Variance probe (stardust/migrate/variance/program.json): subnav (solid grey 66px / navy-ice gradient 59px, no logo), hero (50vw black / centred bottom copy), fullbleed (40px top-centred / left luxe 20+30px), flexview (no heading, 882px), stack absent, full_background_display + moto-cms-legal extra. Each delta budgeted as a variant class.
- dualcar (new): live dual-nav carousel. Section head default content reabsorbed (EW8); one slide per row (picture | copy). Dots (+ `thumbs`: 80px thumbnail strip, live arrow glyphs, dots left / arrows right); `slow` = 7 s. Rotation starts in view after the first page interaction (live stitched captures rest on slide 1). D1 n/a (2-cell rows).
- pcards (new): live interactive-card-grid (3-up) and hover-display-panel (`lead`: a picture-only row = the large lead image). Card = resting + hover picture | heading, colour line, CTA link; hover/focus swaps the picture and reveals the CTA (≤767 always shown). D3 🟡 accepted on `lead` (1-cell lead row, 2-cell card row).
- catchlist (new): live catch-all-list-slider. One slide per row (picture | caption heading); scrollable track, one aria-hidden inert loop copy of the set; rests with the last slide's caption at the left edge (live swiper loop start). Captions authored as h3 (live h3 > p).
- Variants on owned blocks: subnav `slate` / `ocean` (sibling bars release at the top on mobile, archetype bar unchanged), pchero `dark` / `center`, fullbleed `top` / `luxe` / `side` (heading above the image, copy over it; text no role=heading), vhero `duo` (two-column detail) / `bare` (square frame, no heading), flexview `tall`, cblock `card`, legal `spaced`. All variant-scoped; archetype/homepage rules untouched.
- Desktop art only: the gate UA (desktop Chrome) gets *_d_ art at 360 on live; mobile art / 9x16 videos not authored (migrate deviation recorded). HLS videos keep the poster on aem.page (assets.motorola.com CORS).
- brilliant-collection-2026 has no <h1> on the source — none invented (delivery-lint P0 h1 = source parity). The html_upload anchor-only floating button (#section-id, no label) is omitted.
