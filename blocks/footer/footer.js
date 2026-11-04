import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
import { getChromePath } from '../../scripts/scripts.js';

/**
 * Footer — motorola.com light footer: brand + social + country selector row,
 * link columns (accordions at <=767px), legal copy.
 *
 * Template-slotted from the footer document (stardust/runtime-contract.json
 * chrome.footerDocumentContract), classified by content: a section whose <ul>
 * holds image links is the social row, a <p> link holding an image is the
 * country selector, <p><strong> + <ul> pairs are link columns, a section of plain
 * paragraphs is the legal copy, the leading <p> + image is the brand. Authored
 * nodes are MOVED into the template (EW1).
 * Page metadata `Footer Variant | padded` selects the bootstrap-padded variant the
 * live AT homepage serves; the default is the program footer every other page serves.
 * @ew-exempt all — chrome fragment, edited as its own document (/footer)
 */

function el(tag, cls, attrs = {}) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

function nodesOf(section) {
  const wrapper = section.querySelector('.default-content-wrapper') || section;
  return [...wrapper.children];
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const fragment = await loadFragment(getChromePath('footer'));
  block.textContent = '';
  if (!fragment) return;

  const ftr = el('div', 'ftr');
  if ((getMetadata('footer-variant') || '').toLowerCase() === 'padded') ftr.classList.add('ftr-padded');
  const top = el('div', 'ftr-top');
  const links = el('div', 'ftr-links');
  const linksInner = el('div', 'ftr-links-inner');
  links.append(linksInner);
  const copy = el('div', 'ftr-copy');
  const copyInner = el('div', 'ftr-copy-inner');
  const copyText = el('div', 'ftr-copy-text');
  copyInner.append(copyText);
  copy.append(copyInner);

  let brand = null;
  let social = null;
  let locale = null;

  fragment.querySelectorAll(':scope > .section').forEach((section) => {
    const nodes = nodesOf(section);
    if (!nodes.length) return;
    const lists = nodes.filter((n) => n.matches('ul'));
    const socialList = lists.find((ul) => ul.querySelector('a img, a picture'));
    const localeP = nodes.find((n) => n.matches('p') && n.querySelector('a img, a picture'));
    const columnTitles = nodes.filter((n) => n.matches('p') && n.querySelector('strong')
      && !n.querySelector('a'));

    if (socialList) {
      social = el('div', 'ftr-social');
      const inner = el('div', 'ftr-social-inner');
      const title = nodes.find((n) => n.matches('p') && !n.querySelector('img, a'));
      if (title) {
        const t = el('div', 'ftr-social-title', { role: 'heading', 'aria-level': '2' });
        t.append(title);
        inner.append(t);
      }
      socialList.className = 'ftr-social-list';
      socialList.querySelectorAll('a').forEach((a) => a.classList.add('ftr-social-item'));
      inner.append(socialList);
      social.append(inner);
    } else if (localeP) {
      locale = el('div', 'ftr-locale');
      const a = localeP.querySelector('a');
      a.className = 'ftr-locale-link';
      const flag = el('span', 'ftr-flag');
      flag.append(a.querySelector('picture') || a.querySelector('img'));
      const name = el('span', 'ftr-locale-name');
      name.append(...a.childNodes);
      [...name.childNodes].forEach((n) => {
        if (n.nodeType === 3) n.textContent = n.textContent.replace(/^\s+/, '');
      });
      a.append(flag, name);
      locale.append(localeP);
    } else if (columnTitles.length) {
      let col = null;
      nodes.forEach((n) => {
        if (columnTitles.includes(n)) {
          col = el('div', 'ftr-col');
          const t = el('div', 'ftr-col-title', { role: 'heading', 'aria-level': '2' });
          t.append(n);
          col.append(t);
          linksInner.append(col);
        } else if (col && n.matches('ul')) {
          n.className = 'ftr-col-list';
          n.querySelectorAll('a').forEach((a) => a.classList.add('ftr-link'));
          col.append(n);
        }
      });
    } else if (!brand && nodes.some((n) => n.querySelector('img, picture'))) {
      brand = el('div', 'ftr-brand');
      nodes.forEach((n) => {
        const wrap = el('div', n.querySelector('img, picture') ? 'ftr-brand-logo' : 'ftr-brand-tip');
        if (!n.querySelector('img, picture')) wrap.setAttribute('role', 'heading');
        wrap.append(n);
        brand.append(wrap);
      });
    } else {
      copyText.append(...nodes);
    }
  });

  // the live top row always carries the social box (empty on the US footer: 0 x 32px)
  if (!social) social = el('div', 'ftr-social');
  [brand, social, locale].forEach((part) => part && top.append(part));
  ftr.append(top, links, copy);
  block.append(ftr);

  // footer accordions (<=767px): the column title toggles its list
  linksInner.querySelectorAll('.ftr-col-title').forEach((t) => {
    t.setAttribute('aria-expanded', 'false');
    t.addEventListener('click', () => {
      if (!window.matchMedia('(width <= 767px)').matches) return;
      const open = t.parentElement.classList.toggle('is-open');
      t.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
}
