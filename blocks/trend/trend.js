/**
 * trend — "find your phone" trending module (live moto-trendings-v2): centred section
 * title, a persona tab bar with a sliding underline, and a row of product cards
 * (picture, name, outline CTA with arrow, EU energy label row).
 *
 * Authoring: the section title is default content right above the block (reabsorbed).
 * Row 1: a list of tab labels. Then one card per row (or one flattened cell — cards
 * segment on the repeating heading): picture, heading (h3), CTA (<em> = outline pill),
 * linked energy-label image, product-sheet link.
 * The live tabs re-query an API; only the active state + underline move on click.
 * Variant roomy (US home): live padding 60px 35px 0.
 */

const ARROW = '<span class="btn-arrow-box" aria-hidden="true"><svg class="btn-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></span>';

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

function make(tag, className, ...nodes) {
  const d = document.createElement(tag);
  d.className = className;
  d.append(...nodes);
  return d;
}

function frag(html) {
  const t = document.createElement('template');
  t.innerHTML = html;
  return t.content.firstElementChild;
}

function segment(nodes) {
  const counts = {};
  nodes.filter(isHeading).forEach((h) => { counts[h.tagName] = (counts[h.tagName] || 0) + 1; });
  const tag = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];
  const cards = [];
  const head = [];
  let card = null;
  let pending = [];
  nodes.forEach((n) => {
    if (n.tagName === tag) {
      card = {
        pics: pending, heading: n, ctas: [], energy: [], rest: [],
      };
      pending = [];
      cards.push(card);
    } else if (hasPic(n) && !isLinkedPic(n)) {
      pending.push(n);
    } else if (!card) {
      head.push(n);
    } else if (isCta(n)) {
      card.ctas.push(n);
    } else if (isLinkedPic(n) || n.querySelector('a')) {
      card.energy.push(n);
    } else {
      card.rest.push(n);
    }
  });
  if (card && pending.length) card.rest.push(...pending);
  return { head, cards };
}

function setupTabs(tabs, list, slider) {
  const items = [...list.querySelectorAll('li')];
  const place = (t) => {
    slider.style.width = `${t.offsetWidth}px`;
    slider.style.transform = `translateX(${t.offsetLeft}px)`;
  };
  items.forEach((li, i) => {
    // live tabs are <button role="tab">; the li keeps the layout, the button the semantics
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'trend-tab';
    btn.setAttribute('role', 'tab');
    btn.append(...li.childNodes);
    li.append(btn);
    li.setAttribute('role', 'presentation');
    li.classList.toggle('is-active', i === 0);
    btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    btn.addEventListener('click', () => {
      items.forEach((o) => {
        o.classList.toggle('is-active', o === li);
        o.querySelector('.trend-tab')?.setAttribute('aria-selected', o === li ? 'true' : 'false');
      });
      place(li);
    });
  });
}

export default function decorate(block) {
  if (block.querySelector(':scope > .trend-nav')) return; // re-entrant

  // reabsorb the section title (default content right above the block) — EW8
  const title = make('div', 'trend-title');
  const wrapper = block.parentElement;
  const prev = wrapper && wrapper.previousElementSibling;
  if (prev && prev.classList.contains('default-content-wrapper')) {
    title.append(...prev.children);
    prev.remove();
  }

  const nodes = [...block.children].flatMap((row) => [...row.children].flatMap(cellNodes));
  const { head, cards } = segment(nodes);
  const list = head.find((n) => n.tagName === 'UL' || n.tagName === 'OL');
  head.filter((n) => n !== list).forEach((n) => title.append(n));

  const nav = make('div', 'trend-nav');
  nav.setAttribute('role', 'navigation');
  nav.setAttribute('aria-label', 'Trending navigation');
  if (list) {
    const slider = make('span', 'trend-slider');
    const tabs = make('div', 'trend-tabs', list, slider);
    list.setAttribute('role', 'tablist');
    setupTabs(tabs, list, slider);
    const first = list.querySelector('li');
    const sync = () => {
      const active = list.querySelector('li.is-active') || first;
      if (active && active.offsetWidth) {
        slider.style.width = `${active.offsetWidth}px`;
        slider.style.transform = `translateX(${active.offsetLeft}px)`;
      }
    };
    if (window.ResizeObserver) new ResizeObserver(sync).observe(list);
    nav.append(tabs);
  }

  const track = make('ul', 'trend-track');
  cards.forEach((c, i) => {
    c.ctas.forEach((p) => {
      const a = p.querySelector('a.button');
      if (a && !a.querySelector('.btn-arrow-box')) a.append(frag(ARROW));
    });
    const top = make('div', 'trend-top', make('div', 'trend-name', c.heading), ...c.rest);
    if (c.ctas.length) top.append(make('div', 'trend-cta', ...c.ctas));
    const body = make('article', 'trend-body', make('div', 'trend-img', ...c.pics), top);
    if (c.energy.length) body.append(make('div', 'energy', ...c.energy));
    track.append(make('li', `trend-card${i === 0 ? ' is-active' : ''}`, body));
  });
  const rail = make('div', 'trend-rail', track);
  const dots = make('div', 'trend-dots');
  dots.setAttribute('aria-hidden', 'true');
  dots.append(make('span', 'is-active'), make('span', ''));
  rail.append(dots);
  nav.append(rail);

  block.replaceChildren(...(title.children.length ? [title] : []), nav);
}
