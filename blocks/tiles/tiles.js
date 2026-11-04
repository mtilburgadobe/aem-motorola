/**
 * tiles — promo tile pair (live gridLayoulSectionWrapper): side-by-side image tiles with
 * the title, copy and a light CTA pill centred over the top of the image; stacks ≤768px.
 * The tile image links to the tile CTA.
 *
 * Authoring: one tile per row (or one flattened cell — tiles segment on the heading).
 * Per tile: desktop picture, (optional) mobile picture (≤768px), heading, copy, CTA.
 *
 * Variants (block classes): shade (white copy over a top gradient shade).
 *   compact (US home): 32px titles, 10px frame; an outline (<em>) CTA is the light outline
 *     pill with an arrow.
 *   grid (US home, with compact): tiles 1–2 form the first row; the next tile opens a second
 *     row (copy bottom-left) beside a product rail. Product cards are the tiles whose heading
 *     is an h3: picture, h3 name, colour name, a list of swatch colours, the price paragraph
 *     (<s> = was price, <strong> = price), CTA. The rail pages one card at a time
 *     (prev/next + dots).
 * @ew-exempt metadata — swatch colour values are rendered as swatch dots, not as text
 */

const ARROW = '<svg class="btn-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CHEVRON = (d) => `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="${d}" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const isHeading = (el) => /^H[1-6]$/.test(el.tagName);
const hasPic = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');
const isCta = (el) => !!el.querySelector('a');

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

function make(tag, className, ...nodes) {
  const d = document.createElement(tag);
  d.className = className;
  d.append(...nodes);
  return d;
}

function svg(html) {
  const t = document.createElement('template');
  t.innerHTML = html;
  return t.content.firstElementChild;
}

function segment(nodes) {
  const tiles = [];
  let tile = null;
  let pending = [];
  nodes.forEach((n) => {
    if (isHeading(n)) {
      tile = {
        pics: pending.filter(hasPic), heading: n, copy: pending.filter((x) => !hasPic(x)), ctas: [],
      };
      pending = [];
      tiles.push(tile);
    } else if (!tile || hasPic(n)) {
      pending.push(n);
    } else if (isCta(n)) {
      tile.ctas.push(n);
    } else {
      tile.copy.push(n);
    }
  });
  if (tile && pending.length) tile.copy.push(...pending);
  return tiles;
}

function buildTile(block, t) {
  const link = t.ctas.length ? t.ctas[0].querySelector('a') : null;
  const media = make(link ? 'a' : 'div', 'tile-media');
  t.pics.forEach((p, i) => media.append(make('div', i === 0 ? 'art art-desktop' : 'art art-mobile', p)));
  if (t.pics.length > 1) media.classList.add('has-mobile');
  if (link) {
    media.href = link.href;
    media.setAttribute('aria-label', link.textContent);
  }
  if (block.classList.contains('shade')) media.append(make('span', 'tile-shade'));
  const text = make('div', 'tile-text', make('div', 'tile-title', t.heading));
  if (t.copy.length) text.append(make('div', 'tile-desc', ...t.copy));
  const body = make('div', 'tile-body', text);
  if (block.classList.contains('compact')) {
    t.ctas.forEach((p) => {
      const a = p.querySelector('a.button.secondary');
      if (a && !a.querySelector('.btn-arrow')) a.append(svg(ARROW));
    });
  }
  if (t.ctas.length) body.append(make('div', 'tile-cta', ...t.ctas));
  return make('div', 'tile', media, body);
}

// grid: product card — picture, h3, colour name, swatch list, price, CTA
function buildCard(t) {
  const card = make('article', 'tile-card');
  card.append(make('div', 'tile-card-img', ...t.pics));
  card.append(make('div', 'tile-card-name', t.heading));
  const rest = [...t.copy];
  const list = rest.find((el) => el.tagName === 'UL' || el.tagName === 'OL');
  const price = rest.find((el) => el !== list && el.querySelector('s, del, strong'));
  rest.filter((el) => el !== list && el !== price).forEach((el) => {
    el.classList.add('tile-card-colour');
    card.append(el);
  });
  if (list) {
    list.classList.add('tile-card-swatches');
    [...list.children].forEach((li) => {
      const value = li.textContent.trim();
      const dot = make('span', 'tile-card-dot');
      dot.style.backgroundColor = value;
      li.setAttribute('aria-label', value);
      li.replaceChildren(dot);
    });
    card.append(list);
  }
  if (price) {
    price.classList.add('tile-card-price');
    card.append(price);
  }
  card.append(make('div', 'tile-card-cta', ...t.ctas));
  return card;
}

function rail(cards) {
  const track = make('div', 'tile-track', ...cards);
  const viewport = make('div', 'tile-viewport', track);
  const prev = make('button', 'tile-prev');
  const next = make('button', 'tile-next');
  prev.type = 'button';
  next.type = 'button';
  prev.setAttribute('aria-label', 'Previous slide');
  next.setAttribute('aria-label', 'Next slide');
  prev.append(svg(CHEVRON('M15 5l-7 7 7 7')));
  next.append(svg(CHEVRON('M9 5l7 7-7 7')));
  const dots = make('div', 'tile-dots');
  const shop = make('div', 'tile-shop', viewport, make('div', 'tile-nav', prev, dots, next));
  let index = 0;
  const pages = () => {
    const card = cards[0];
    if (!card || !card.offsetWidth) return 1;
    const step = card.offsetWidth + 16;
    const fit = Math.max(1, Math.floor((viewport.clientWidth + 16) / step));
    return Math.max(1, cards.length - fit + 1);
  };
  const go = (i) => {
    const n = pages();
    index = Math.max(0, Math.min(i, n - 1));
    const step = cards[0] ? cards[0].offsetWidth + 16 : 0;
    track.style.transform = `translateX(${-index * step}px)`;
    prev.disabled = index === 0;
    next.disabled = index >= n - 1;
    if (dots.children.length !== n) {
      dots.replaceChildren(...Array.from({ length: n }, () => make('span', 'tile-dot')));
    }
    [...dots.children].forEach((d, k) => d.classList.toggle('is-active', k === index));
  };
  prev.addEventListener('click', () => go(index - 1));
  next.addEventListener('click', () => go(index + 1));
  requestAnimationFrame(() => go(index));
  if (window.ResizeObserver) new ResizeObserver(() => go(index)).observe(viewport);
  return shop;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .tiles-grid')) return; // re-entrant
  const nodes = [...block.children].flatMap((row) => [...row.children].flatMap(cellNodes));
  const grid = make('div', 'tiles-grid');
  const all = segment(nodes);
  if (!block.classList.contains('grid')) {
    all.forEach((t) => grid.append(buildTile(block, t)));
    block.replaceChildren(grid);
    return;
  }
  const tiles = all.filter((t) => t.heading.tagName !== 'H3');
  const cards = all.filter((t) => t.heading.tagName === 'H3').map(buildCard);
  tiles.slice(0, 2).forEach((t) => grid.append(buildTile(block, t)));
  const row2 = make('div', 'tiles-row2', ...tiles.slice(2).map((t) => buildTile(block, t)));
  if (cards.length) row2.append(rail(cards));
  block.replaceChildren(grid, row2);
}
