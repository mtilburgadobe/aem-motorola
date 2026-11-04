/**
 * hcar — home carousel (live .homeCarousel): full-width slides, each a background
 * picture, optional logo picture, headline, sub-copy and CTA pills; a next button and
 * pagination dots sit on the frame. The live carousel does not advance (its next
 * control is inert), so slides render statically with the first one at rest.
 *
 * Authoring: one slide per row (or one flattened cell — slides segment on the heading).
 * Per slide: background picture, (optional) logo picture, heading, copy, CTA paragraphs
 * (<strong> = dark pill, <em> = outline pill with arrow), then optional marker words.
 *
 * @variants slide marker: dark | logo-large — dark = black copy, logo-large = 100px logo
 * @variants block: small-logo — 40px slide logos (US home); landscape — wide art kept at
 *   253px on phones, one-line headline (US home)
 * @ew-exempt metadata — slide marker words (dark, logo-large) are never displayed
 */

const ARROW = '<svg class="btn-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const MARKERS = ['dark', 'logo-large'];

const isHeading = (el) => /^H[1-6]$/.test(el.tagName);
const hasPic = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');
const isCta = (el) => !!el.querySelector('a.button') || el.classList.contains('button-wrapper');
const marker = (el) => {
  const t = el.tagName === 'P' && !el.children.length ? el.textContent.trim().toLowerCase() : '';
  return MARKERS.includes(t) ? t : '';
};

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

// pictures always open the next slide (bg, logo precede the heading)
function segment(nodes) {
  const slides = [];
  let slide = null;
  let pending = [];
  nodes.forEach((n) => {
    if (isHeading(n)) {
      slide = {
        pics: pending.filter(hasPic),
        heading: n,
        copy: pending.filter((x) => !hasPic(x)),
        ctas: [],
        marks: [],
      };
      pending = [];
      slides.push(slide);
    } else if (!slide || hasPic(n)) {
      pending.push(n);
    } else if (marker(n)) {
      slide.marks.push(n);
    } else if (isCta(n)) {
      slide.ctas.push(n);
    } else {
      slide.copy.push(n);
    }
  });
  if (slide && pending.length) slide.copy.push(...pending);
  return slides;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .hcar-frame')) return; // re-entrant
  const nodes = [...block.children].flatMap((row) => [...row.children].flatMap(cellNodes));
  const slides = segment(nodes);

  const track = make('div', 'hcar-track');
  slides.forEach((s, i) => {
    const slide = make('div', `hcar-slide${i === 0 ? ' is-active' : ''}`);
    slide.setAttribute('role', 'group');
    slide.setAttribute('aria-label', `${i + 1} / ${slides.length}`);
    s.marks.forEach((m) => {
      slide.classList.add(marker(m));
      m.hidden = true;
    });
    const firstLink = s.ctas.length ? s.ctas[s.ctas.length - 1].querySelector('a') : null;
    const bg = make(firstLink ? 'a' : 'div', 'hcar-bg', make('span', 'hcar-img', ...s.pics.slice(0, 1)));
    if (firstLink) {
      bg.href = firstLink.href;
      bg.setAttribute('aria-label', `Hero banner about ${s.heading.textContent}`);
    }
    const text = make('div', 'hcar-text');
    if (s.pics.length > 1) text.append(make('div', 'hcar-logo', ...s.pics.slice(1)));
    text.append(make('div', 'hcar-title', s.heading));
    if (s.copy.length) text.append(make('div', 'hcar-sub', ...s.copy));
    s.ctas.forEach((p) => {
      const a = p.querySelector('a.button.secondary');
      if (a && !a.querySelector('.btn-arrow')) a.append(svg(ARROW));
    });
    let textBox = text;
    if (firstLink) {
      textBox = make('a', 'hcar-textlink', text);
      textBox.href = firstLink.href;
    }
    const outer = make('div', 'hcar-outer', textBox, make('div', 'hcar-cta', ...s.ctas), ...s.marks);
    slide.append(bg, outer);
    track.append(slide);
  });

  // live swiper-button-next: a real (inert) button
  const next = make('button', 'hcar-next');
  next.type = 'button';
  next.setAttribute('aria-label', 'Next slide');
  next.append(svg('<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'));
  const dots = make('div', 'hcar-dots');
  dots.setAttribute('aria-hidden', 'true');
  slides.forEach((s, i) => dots.append(make('span', `hcar-dot${i === 0 ? ' is-active' : ''}`)));

  block.replaceChildren(make('div', 'hcar-frame', make('div', 'hcar-viewport', track), next, dots));
}
