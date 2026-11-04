/**
 * gallery — "all things Motorola" catch-all carousel (live catch-allv3): image slides with
 * a bottom fade and caption; a light CTA pill appears on hover. Autoplays every 4 s with
 * the active slide centred (desktop) and loops through clones; hovering the carousel
 * holds it, the pause button toggles autoplay.
 *
 * Authoring: one slide per row (or one flattened cell — a picture after a slide's text
 * opens the next slide). Per slide: desktop picture, (optional) mobile picture (≤600px),
 * CTA paragraph (<strong><em> = light pill), caption paragraph.
 *
 * Variant thirds (US home): each slide is a third of the viewport wide (desktop).
 */

const PAUSE = '<svg width="40" height="40" viewBox="0 0 27 27" fill="none" aria-hidden="true"><path d="M11 17.25V9.75M16 17.25V9.75M26 13.5C26 20.4036 20.4036 26 13.5 26C6.59644 26 1 20.4036 1 13.5C1 6.59644 6.59644 1 13.5 1C20.4036 1 26 6.59644 26 13.5Z" stroke="#5F5E60" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const INTERVAL = 4000;

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

// presentational clones must not keep the editor's indices (EW4)
function stripInstrumentation(node) {
  node.querySelectorAll('[data-prose-index], [data-image-index]').forEach((n) => {
    n.removeAttribute('data-prose-index');
    n.removeAttribute('data-image-index');
  });
  node.removeAttribute('data-prose-index');
  return node;
}

function segment(rows) {
  const slides = [];
  let slide = null;
  const open = () => {
    slide = { pics: [], ctas: [], copy: [] };
    slides.push(slide);
  };
  rows.forEach((nodes) => {
    if (rows.length > 1) open();
    nodes.forEach((n) => {
      if (hasPic(n)) {
        if (!slide || slide.ctas.length || slide.copy.length) open();
        slide.pics.push(n);
      } else {
        if (!slide) open();
        if (isCta(n)) slide.ctas.push(n);
        else slide.copy.push(n);
      }
    });
  });
  return slides.filter((s) => s.pics.length || s.ctas.length || s.copy.length);
}

function buildSlide(s, i, total) {
  const media = make('div', 'gallery-media');
  media.setAttribute('aria-hidden', 'true');
  s.pics.forEach((p, k) => media.append(make('div', k === 0 ? 'art art-desktop' : 'art art-mobile', p)));
  if (s.pics.length > 1) media.classList.add('has-mobile');
  const item = make('div', 'gallery-item', make('div', 'gallery-fade'), media, make('div', 'gallery-dim'));
  item.setAttribute('aria-label', `Slide ${i + 1} of ${total}`);
  if (s.ctas.length) item.append(make('div', 'gallery-btn', ...s.ctas));
  const li = make('li', 'gallery-slide', item);
  if (s.copy.length) li.append(make('div', 'gallery-caption', make('div', 'gallery-caption-text', ...s.copy)));
  return li;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .gallery-region')) return; // re-entrant
  const rows = [...block.children].map((row) => [...row.children].flatMap(cellNodes));
  const slides = segment(rows);
  const total = slides.length;
  const real = slides.map((s, i) => buildSlide(s, i, total));
  const clone = (li) => {
    const c = stripInstrumentation(li.cloneNode(true));
    c.classList.add('is-clone');
    c.setAttribute('aria-hidden', 'true');
    c.querySelectorAll('a').forEach((a) => { a.tabIndex = -1; });
    return c;
  };
  const track = make('ol', 'gallery-track', ...real.map(clone), ...real, ...real.map(clone));
  const all = [...track.children];

  const viewport = make('div', 'gallery-viewport', track);
  const pause = make('button', 'gallery-pause');
  pause.type = 'button';
  pause.setAttribute('aria-label', 'Pause All Things Motorola carousel');
  const t = document.createElement('template');
  t.innerHTML = PAUSE;
  pause.append(t.content.firstElementChild);
  const region = make('section', 'gallery-region', viewport, make('div', 'gallery-controls', pause));
  region.setAttribute('aria-label', 'Gallery');
  region.setAttribute('aria-roledescription', 'carousel');
  block.replaceChildren(region);
  if (!total) return;

  const mq = window.matchMedia('(width <= 600px)');
  let index = total; // first real slide
  let paused = false;
  let hovering = false;
  const offset = (i) => {
    const w = all[0].offsetWidth || (mq.matches ? 288 : 495);
    if (mq.matches) return -i * w - 4;
    const vw = viewport.clientWidth || document.body.clientWidth;
    return Math.round((vw - w) / 2) - i * w;
  };
  const mark = () => all.forEach((s, i) => {
    s.classList.toggle('is-active', i === index);
    s.classList.toggle('is-prev', i === index - 1);
    s.classList.toggle('is-next', i === index + 1);
  });
  const go = (i, animate) => {
    track.style.transition = animate ? '' : 'none';
    index = i;
    track.style.transform = `translateX(${offset(i)}px)`;
    mark();
    if (!animate) {
      track.getBoundingClientRect();
      track.style.transition = '';
    }
  };
  track.addEventListener('transitionend', () => {
    if (index >= total * 2) go(index - total, false);
    if (index < total) go(index + total, false);
  });
  go(index, false);
  // re-measure once the section is laid out (it is hidden while blocks load)
  requestAnimationFrame(() => go(index, false));
  if (window.ResizeObserver) new ResizeObserver(() => go(index, false)).observe(viewport);

  const timer = setInterval(() => {
    if (!paused && !hovering && !document.hidden) go(index + 1, true);
  }, INTERVAL);
  region.addEventListener('mouseenter', () => {
    hovering = true;
    region.classList.add('is-hover');
  });
  region.addEventListener('mouseleave', () => {
    hovering = false;
    region.classList.remove('is-hover');
  });
  pause.addEventListener('click', () => {
    paused = !paused;
    pause.setAttribute('aria-label', `${paused ? 'Play' : 'Pause'} All Things Motorola carousel`);
    pause.classList.toggle('is-paused', paused);
  });
  window.addEventListener('pagehide', () => clearInterval(timer));
}
