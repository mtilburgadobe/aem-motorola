/**
 * subnav — product sticky sub-navigation (live .sticky-nav-container): a gradient bar with the
 * product logo on the left and a buy CTA on the right. As soon as the page scrolls past it,
 * the bar turns fixed under the site header (no placeholder — the content below moves up by the
 * bar height, as live; ≤767px the bar stays fixed once the page has been scrolled, even back at
 * the top, and the document shrinks by the bar height — live stitched captures, 2026-11-03).
 *
 * Authoring: one row (cells or flat siblings): the logo picture, then the CTA link paragraph.
 *
 * @variants block: slate — solid grey bar, 46px square logo, outline CTA (live razr 70 page)
 * @variants block: ocean — navy-to-ice gradient bar, navy CTA pill (live brilliant collection)
 */

const isMedia = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');

function make(tag, className, ...nodes) {
  const d = document.createElement(tag);
  d.className = className;
  d.append(...nodes);
  return d;
}

function headerH() {
  const v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
  return Number.isNaN(v) ? 88 : v;
}

function stick(block) {
  const mq = window.matchMedia('(width <= 767px)');
  const onScroll = () => {
    const edge = block.getBoundingClientRect().top + window.scrollY - headerH();
    // live: ≤767px the bar stays fixed back at the top once the page has scrolled (razr-fold);
    // the sibling bars (slate, ocean) release at the top again (live stitched 360 captures)
    const sticky = mq.matches && !block.matches('.slate, .ocean');
    const fixed = sticky ? window.scrollY >= edge : window.scrollY > edge;
    block.classList.toggle('is-fixed', fixed);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  if (window.scrollY > 0) onScroll();
}

export default function decorate(block) {
  if (block.querySelector(':scope > .subnav-bar')) return;
  const nodes = [...block.querySelectorAll(':scope > div > div')].flatMap((c) => [...c.children]);
  const logo = make('div', 'subnav-logo');
  const cta = make('div', 'subnav-cta');
  nodes.forEach((node) => {
    if (isMedia(node) && !node.textContent.trim()) logo.append(node);
    else cta.append(node);
  });
  const bar = make('div', 'subnav-bar', logo, cta);
  block.replaceChildren(bar);
  stick(block);
}
