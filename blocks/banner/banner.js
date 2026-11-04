/**
 * banner — full-bleed promo banner (live section.banner-container): background image
 * (desktop + optional mobile art direction), optional logo, headline, copy and CTAs
 * overlaid left. The whole media area links to the first CTA.
 *
 * Authoring rows:
 *   1. media — desktop picture, then (optional) mobile picture (≤600px)
 *   2. text — (optional) logo picture(s) desktop then mobile, heading, copy, CTA links
 *      (<strong> = dark pill, <strong><em> = light pill, <em> = outline)
 * A single flattened cell is tolerated: leading pictures before the heading are split
 * media-first (2 → media + mobile, 4 → media pair + logo pair, 3 → media pair + logo).
 *
 * Variants (block classes): light-text (white copy), wide (text column 50%),
 *   static (no media link — offers campaign), solo (single-slide home carousel —
 *   contest campaign: 553px image, copy top-left), fit (text column sized to its content —
 *   US home), medium (text column 45% — US home), plain (US home: neither the media nor the copy
 *   is a link — only the CTA pills are), tall-logo (US home: 100px logo).
 */

const isPic = (el) => el && (el.matches('picture, img') || !!el.querySelector('picture, img'));
const isCta = (el) => el && el.querySelector('a') && !el.querySelector('picture, img');

// expand a runtime-folded media-led <p> (wrapTextNodes) back into its elements
function cellNodes(cell) {
  const kids = [...cell.children];
  if (kids.length === 1 && kids[0].tagName === 'P' && kids[0].querySelector('picture, img')
    && kids[0].children.length > 1) {
    return [...kids[0].children];
  }
  if (!kids.length && cell.textContent.trim()) {
    // harness-only fallback: bare text cell — wrap the existing text nodes
    const p = document.createElement('p');
    p.append(...cell.childNodes);
    return [p];
  }
  return kids;
}

// art direction: each authored picture gets a wrapper; the second is the ≤600px one
function artBox(nodes, className) {
  const box = document.createElement('div');
  box.className = className;
  nodes.forEach((node, i) => {
    const art = document.createElement('div');
    art.className = i === 0 ? 'art art-desktop' : 'art art-mobile';
    art.append(node);
    box.append(art);
  });
  if (nodes.length > 1) box.classList.add('has-mobile');
  return box;
}

function wrap(nodes, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(...nodes);
  return w;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .banner-content')) return; // re-entrant
  const rows = [...block.children];
  let media = [];
  let rest = [];
  if (rows.length > 1) {
    rows.forEach((row, i) => {
      const nodes = [...row.children].flatMap(cellNodes);
      if (i === 0 && nodes.every(isPic)) media = nodes;
      else rest.push(...nodes);
    });
  } else {
    const nodes = rows.length ? [...rows[0].children].flatMap(cellNodes) : [];
    const lead = [];
    while (nodes.length && isPic(nodes[0])) lead.push(nodes.shift());
    media = lead.slice(0, Math.min(lead.length, 2));
    rest = [...lead.slice(media.length), ...nodes];
  }

  const logos = [];
  while (rest.length && isPic(rest[0])) logos.push(rest.shift());
  const heading = rest.find((el) => /^H[1-6]$/.test(el.tagName));
  const ctas = rest.filter(isCta);
  const copy = rest.filter((el) => el !== heading && !ctas.includes(el));

  const firstLink = ctas.length ? ctas[0].querySelector('a') : null;
  const stage = document.createElement(
    firstLink && !block.classList.contains('static') && !block.classList.contains('plain') ? 'a' : 'div',
  );
  stage.className = 'banner-link';
  if (stage.tagName === 'A') {
    stage.href = firstLink.href;
    stage.tabIndex = -1;
    const img = media.length ? media[0].querySelector('img') || media[0] : null;
    stage.setAttribute('aria-label', (img && img.alt) || firstLink.textContent);
  }
  stage.append(artBox(media, 'banner-media'));

  const text = document.createElement('div');
  text.className = 'banner-text';
  if (logos.length) {
    text.append(artBox(logos, 'banner-logo'));
  }
  if (heading) text.append(wrap([heading], 'banner-title'));
  if (copy.length) text.append(wrap(copy, 'banner-desc'));

  // live: the copy is a link too (same target as the media) — the CTA stays outside it
  let textBox = text;
  if (stage.tagName === 'A') {
    textBox = document.createElement('a');
    textBox.className = 'banner-textlink';
    textBox.href = firstLink.href;
    textBox.tabIndex = -1;
    textBox.append(text);
  }
  const content = document.createElement('div');
  content.className = 'banner-content';
  content.append(textBox);
  if (ctas.length) content.append(wrap(ctas, 'banner-ctas'));

  block.replaceChildren(stage, content);
}
