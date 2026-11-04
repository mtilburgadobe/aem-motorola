/**
 * reco — product recommendation rail (live moto-recommendations-v2): N product cards,
 * each a product picture, a name heading, CTA pills revealed on hover (desktop) and an
 * optional EU energy-label row (linked label image + product-sheet link).
 *
 * Authoring: one card per row (or one flattened cell — cards segment on the repeating
 * heading). Per card: picture, heading (h3), CTA paragraphs (<em> = outline pill with
 * arrow, <strong> = dark pill), then the energy label (a linked label image) and the
 * plain "product sheet" link.
 *
 * Variants (block classes): deal (offers campaign rail — live moto-recommendations-v2 on
 * /offers). The section title (and an optional description paragraph) is default content
 * right above the block (reabsorbed). One card per row; per card after the h3: optional
 * gift line, colour name, a list of swatch colours (first = selected), the price paragraph
 * (<s> = was price, <strong> = sale price), CTAs, energy label (linked or plain image) and
 * the product-sheet link. CTAs stay visible; the rail pages 4 cards at a time with
 * prev/next + dots; swatch clicks move the selection ring (no SKU data swap).
 * Out-of-stock card (contest): a plain paragraph after the swatch list instead of the price
 * = the status badge ("Nicht Vorrätig"); a bold-only paragraph after it = the notify-me pill
 * (no backend, dynamic-features decision D1); a plain paragraph after the energy label =
 * an unlinked product-sheet label.
 * Variant flush (with deal): the live contest rail — no top padding, #f5f5f5 cards, CTA pills
 * capped at 180px above 600px (labels wrap), no underline on the sheet link.
 * Variant titled (US home rail): the plain rail with its section title (default content right
 * above the block, reabsorbed) centred over the cards.
 */

const ARROW = '<svg class="btn-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const isHeading = (el) => /^H[1-6]$/.test(el.tagName);
const hasPic = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');
const isCta = (el) => !!el.querySelector('a.button') || el.classList.contains('button-wrapper');
const isLinkedPic = (el) => hasPic(el) && !!el.querySelector('a picture, a img');

function cellNodes(cell) {
  const kids = [...cell.children];
  if (kids.length === 1 && kids[0].tagName === 'P' && kids[0].querySelector('picture, img')
    && kids[0].children.length > 1 && !kids[0].querySelector('a picture, a img')) {
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

function div(className, ...nodes) {
  const d = document.createElement('div');
  d.className = className;
  d.append(...nodes);
  return d;
}

function arrow() {
  const t = document.createElement('template');
  t.innerHTML = ARROW;
  return t.content.firstElementChild;
}

// segment flattened nodes into cards on the repeating heading
function segment(nodes) {
  const counts = {};
  nodes.filter(isHeading).forEach((h) => { counts[h.tagName] = (counts[h.tagName] || 0) + 1; });
  const tag = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
  const cards = [];
  let card = null;
  let pending = [];
  nodes.forEach((el) => {
    if (el.tagName === tag) {
      card = {
        pics: pending, heading: el, ctas: [], energy: [], rest: [],
      };
      pending = [];
      cards.push(card);
    } else if (hasPic(el) && !isLinkedPic(el)) {
      pending.push(el);
    } else if (!card) {
      pending.push(el);
    } else if (isCta(el)) {
      card.ctas.push(el);
    } else if (isLinkedPic(el) || el.querySelector('a')) {
      card.energy.push(el);
    } else {
      card.rest.push(el);
    }
  });
  if (card && pending.length) card.rest.push(...pending);
  return cards;
}

// deal: one card per row — pictures after the heading are the energy label (linked or not)
function segmentRows(block) {
  return [...block.children].map((row) => {
    const nodes = [...row.children].flatMap(cellNodes);
    const at = nodes.findIndex(isHeading);
    if (at < 0) return null;
    const card = {
      pics: nodes.slice(0, at), heading: nodes[at], ctas: [], energy: [], rest: [],
    };
    nodes.slice(at + 1).forEach((el) => {
      if (isCta(el)) card.ctas.push(el);
      else if (hasPic(el) || el.querySelector('a')) card.energy.push(el);
      else if (card.energy.length) card.energy.push(el); // unlinked product-sheet label
      else card.rest.push(el);
    });
    return card;
  }).filter(Boolean);
}

function isColor(v) {
  return typeof CSS !== 'undefined' && CSS.supports ? CSS.supports('color', v) : /^(#|rgb|hsl)/.test(v);
}

// swatches: the authored list items are the swatches (colour value kept as the item text)
function swatches(list) {
  list.classList.add('reco-swatches');
  list.setAttribute('role', 'radiogroup');
  const items = [...list.children];
  items.forEach((li, i) => {
    const color = li.textContent.trim();
    li.className = i === 0 ? 'reco-swatch is-selected' : 'reco-swatch';
    li.setAttribute('role', 'radio');
    li.setAttribute('aria-checked', String(i === 0));
    li.tabIndex = i === 0 ? 0 : -1;
    if (isColor(color)) li.style.setProperty('--swatch', color);
  });
  // live: selecting a colour moves the ring only (SKU data swap needs the commerce API)
  const select = (sw) => {
    items.forEach((s) => {
      const on = s === sw;
      s.classList.toggle('is-selected', on);
      s.setAttribute('aria-checked', String(on));
      s.tabIndex = on ? 0 : -1;
    });
  };
  list.addEventListener('click', (e) => {
    const sw = e.target.closest('.reco-swatch');
    if (sw) select(sw);
  });
  list.addEventListener('keydown', (e) => {
    const cur = items.indexOf(e.target.closest('.reco-swatch'));
    if (cur < 0) return;
    let to = -1;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') to = (cur + 1) % items.length;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') to = (cur - 1 + items.length) % items.length;
    if (e.key === ' ' || e.key === 'Enter') to = cur;
    if (to < 0) return;
    e.preventDefault();
    select(items[to]);
    items[to].focus();
  });
  return list;
}

// deal: gift line(s), colour name + swatches, price — the authored paragraphs, moved
function dealConfig(rest) {
  const list = rest.find((el) => el.tagName === 'UL' || el.tagName === 'OL');
  const listAt = list ? rest.indexOf(list) : -1;
  // out of stock (contest): a plain paragraph after the swatches is the status badge;
  // bold-only paragraphs after it are the notify-me pill (moved to the CTA row)
  const after = listAt < 0 ? [] : rest.slice(listAt + 1)
    .filter((el) => el.tagName === 'P' && !el.querySelector('s, del, a'));
  const status = after.find((el) => !el.querySelector('strong')) || null;
  const notify = status ? after.filter((el) => el !== status) : [];
  const own = rest.filter((el) => el !== status && !notify.includes(el));
  const price = own.find((el) => el.querySelector('s, del'))
    || [...own].reverse().find((el) => el !== list && el.querySelector('strong'));
  const plain = own.filter((el) => el !== list && el !== price);
  let sku = null;
  if (list) sku = plain.filter((el) => rest.indexOf(el) < listAt).pop() || null;
  const gift = plain.filter((el) => el !== sku);
  const out = {
    gift: null, sku: null, price: null, notify,
  };
  // live keeps the (usually empty) gift line under every name — it holds the 10px gap
  out.gift = div('reco-gift', ...gift);
  if (!gift.length) out.gift.setAttribute('aria-hidden', 'true');
  if (sku) {
    sku.classList.add('reco-sku-name');
    sku.setAttribute('aria-hidden', 'true');
  }
  if (sku || list) {
    out.sku = div('reco-sku', ...[sku, list && swatches(list)].filter(Boolean));
    if (list && sku) list.setAttribute('aria-label', sku.textContent.trim());
  }
  if (price) {
    price.classList.add('reco-price-inner');
    const was = price.querySelector('s, del');
    if (was) was.classList.add('reco-was');
    const now = price.querySelector('strong');
    if (now) now.classList.add('reco-now');
    out.price = div('reco-price', price);
  } else if (status) {
    status.classList.add('reco-oos');
    out.price = div('reco-status', status);
  }
  notify.forEach((p) => p.classList.add('reco-notify'));
  return out;
}

// deal: live Swiper paging — 4 per view, groups of 4, prev/next + bullets
function pager(block, track) {
  const cards = [...track.children];
  const PER = 4;
  if (cards.length <= PER) return null;
  const pages = Math.ceil((cards.length - PER) / PER) + 1;
  let page = 0;
  const btn = (className, label) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = className;
    b.setAttribute('aria-label', label);
    b.title = label;
    return b;
  };
  const prev = btn('reco-prev', 'Previous slide');
  const next = btn('reco-next', 'Next slide');
  const dots = div('reco-dots');
  const dotEls = [];
  for (let i = 0; i < pages; i += 1) {
    const d = btn('reco-dot', `Go to slide ${i + 1}`);
    d.removeAttribute('title');
    dotEls.push(d);
    dots.append(d);
  }
  const render = () => {
    const first = Math.min(page * PER, cards.length - PER);
    const step = cards[1].offsetLeft - cards[0].offsetLeft;
    track.style.transform = first ? `translate3d(${-first * step}px, 0, 0)` : '';
    dotEls.forEach((d, i) => {
      d.classList.toggle('is-active', i === page);
      if (i === page) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
    prev.disabled = page === 0;
    next.disabled = page === pages - 1;
  };
  const go = (p) => { page = Math.max(0, Math.min(pages - 1, p)); render(); };
  prev.addEventListener('click', () => go(page - 1));
  next.addEventListener('click', () => go(page + 1));
  dotEls.forEach((d, i) => d.addEventListener('click', () => go(i)));
  window.addEventListener('resize', () => {
    track.style.transition = 'none';
    render();
    track.getBoundingClientRect();
    track.style.transition = '';
  });
  render();
  return div('reco-nav', prev, dots, next);
}

function reabsorbHead(block) {
  const wrapper = block.parentElement;
  const prev = wrapper && wrapper.previousElementSibling;
  if (!prev || !prev.classList.contains('default-content-wrapper')) return [];
  const nodes = [...prev.children];
  prev.remove();
  return nodes.map((el) => {
    if (isHeading(el)) el.classList.add('reco-title');
    else el.classList.add('reco-desc');
    return el;
  });
}

export default function decorate(block) {
  if (block.querySelector(':scope > .reco-rail')) return; // re-entrant
  const deal = block.classList.contains('deal');
  const head = deal || block.classList.contains('titled') ? reabsorbHead(block) : [];
  const cards = deal ? segmentRows(block)
    : segment([...block.children].flatMap((row) => [...row.children].flatMap(cellNodes)));

  const track = document.createElement('ul');
  track.className = 'reco-track';
  cards.forEach((c, i) => {
    const li = document.createElement('li');
    li.className = 'reco-card';
    li.setAttribute('role', 'group');
    li.setAttribute('aria-label', `${i + 1} / ${cards.length}`);
    c.ctas.forEach((p) => {
      const a = p.querySelector('a.button.secondary');
      if (a && !a.querySelector('.btn-arrow')) a.append(arrow());
    });
    let config;
    if (deal) {
      const d = dealConfig(c.rest);
      config = div('reco-config', div('reco-name', c.heading, ...[d.gift].filter(Boolean)), ...[d.sku, d.price].filter(Boolean));
      c.ctas.push(...d.notify);
    } else {
      config = div('reco-config', div('reco-name', c.heading), ...c.rest);
    }
    const content = div('reco-content', config, div('reco-ctas', ...c.ctas));
    const product = div('reco-product', ...c.pics, content);
    const body = document.createElement('article');
    body.className = 'reco-body';
    body.append(product);
    if (c.energy.length) body.append(div('energy', ...c.energy));
    li.append(body);
    track.append(li);
  });
  if (!deal) {
    block.replaceChildren(...head, div('reco-rail', track));
    return;
  }
  const rail = div('reco-rail', ...head, div('reco-viewport', track));
  block.replaceChildren(rail);
  const nav = pager(block, track);
  if (nav) block.append(nav);
}
