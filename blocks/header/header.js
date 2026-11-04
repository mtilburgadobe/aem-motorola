import { loadFragment } from '../fragment/fragment.js';
import { getChromePath } from '../../scripts/scripts.js';

/**
 * Header — motorola.com chrome: promo bar + white nav bar with hover mega menus,
 * search / cart / account utilities, fixed at the top (88px reserved by styles.css).
 *
 * Template-slotted from the nav document (stardust/runtime-contract.json
 * chrome.navDocumentContract): section 1 promo, section 2 brand, section 3 main nav
 * list, section 4 tools. Nested lists are the mega menus: first <ul> = left tab
 * block, <ol> = right (featured) tab block; a tab item with an image is a product
 * card, without one a "more" link. Authored nodes are MOVED into the template
 * (EW1); the nav document is a fragment fetched at runtime, never instrumented by
 * the workspace, so the generated classes on moved nodes are safe here.
 * @ew-exempt all — chrome fragment, edited as its own document (/nav)
 */

const SVG_NS = 'http://www.w3.org/2000/svg';

function svg(width, height, viewBox, d, stroke, cls) {
  const node = document.createElementNS(SVG_NS, 'svg');
  node.setAttribute('width', width);
  node.setAttribute('height', height);
  node.setAttribute('viewBox', viewBox);
  node.setAttribute('fill', 'none');
  node.setAttribute('aria-hidden', 'true');
  if (cls) node.setAttribute('class', cls);
  const path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', d);
  if (stroke) {
    path.setAttribute('stroke', stroke);
    path.setAttribute('stroke-width', cls === 'mm-tab-arrow' ? '1' : '1.5');
    path.setAttribute('stroke-linecap', cls === 'mm-tab-arrow' ? 'butt' : 'round');
  } else {
    path.setAttribute('fill', 'black');
    path.setAttribute('fill-rule', 'evenodd');
    path.setAttribute('clip-rule', 'evenodd');
  }
  node.append(path);
  return node;
}

const arrowDown = () => svg(13, 8, '0 0 13 8', 'M11.75 0.75L6.25 6.75L0.750001 0.749999', 'black', 'hdr-arrow');
const arrowTab = () => svg(14, 14, '0 0 16 16', 'M6 3L10 8L6 13', '#00529C', 'mm-tab-arrow');
const arrowMore = () => svg(11, 6, '0 0 8 13', 'M0.750007 0.75L6.75001 6.25L0.750008 11.75', '#92908F', 'mm-more-arrow');
const SEARCH_D = 'M8.5755 19.7755C8.5755 13.7832 13.4332 8.92547 19.4255 8.92547C25.4178 8.92547 '
  + '30.2754 13.7832 30.2754 19.7755C30.2754 25.7678 25.4178 30.6254 19.4255 30.6254C13.4332 '
  + '30.6254 8.5755 25.7678 8.5755 19.7755ZM19.4255 6.12549C11.8868 6.12549 5.77551 12.2368 '
  + '5.77551 19.7755C5.77551 27.3142 11.8868 33.4255 19.4255 33.4255C22.0431 33.4255 24.4885 '
  + '32.6887 26.5659 31.4112C27.4396 30.874 28.5885 30.9183 29.3137 31.6435L34.2895 '
  + '36.6194C34.8362 37.1662 35.7227 37.1662 36.2695 36.6194C36.8162 36.0727 36.8162 35.1862 '
  + '36.2695 34.6394L31.2936 29.6637C30.5683 28.9385 30.524 27.7895 31.0613 26.9159C32.3388 '
  + '24.8385 33.0755 22.393 33.0755 19.7755C33.0755 12.2368 26.9643 6.12549 19.4255 6.12549Z';

function el(tag, cls, attrs = {}) {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

/** strip the button decoration decorateButtons() put on chrome links */
function unbutton(root) {
  root.querySelectorAll('.button-wrapper').forEach((p) => p.classList.remove('button-wrapper'));
  // decorateButtons() titles every p > a with its text; authored titles (layout keys) differ
  root.querySelectorAll('a[title]').forEach((a) => {
    if (a.title === a.textContent) a.removeAttribute('title');
  });
  root.querySelectorAll('a.button').forEach((a) => {
    a.classList.remove('button', 'primary', 'secondary', 'accent');
    if (!a.className) a.removeAttribute('class');
  });
}

/** split a list item into its head nodes (label) and its nested lists */
function splitItem(li) {
  const lists = [...li.children].filter((c) => c.matches('ul, ol'));
  const head = [...li.childNodes].filter((n) => !(n.nodeType === 1 && n.matches('ul, ol')));
  return { head, lists };
}

function headLink(head) {
  let link = null;
  head.some((n) => {
    if (n.nodeType !== 1) return false;
    link = n.matches('a') ? n : n.querySelector('a');
    return !!link;
  });
  return link;
}

/** move the head's text content (unwrapping a delivered <p>) into target */
function moveHead(head, target) {
  head.forEach((n) => {
    if (n.nodeType === 1 && n.matches('p')) target.append(...n.childNodes);
    else if (n.nodeType === 1 || n.textContent.trim()) target.append(n);
  });
  // drop leading/trailing whitespace-only text nodes the list markup leaves behind
  [...target.childNodes].forEach((n) => {
    if (n.nodeType === 3 && !n.textContent.trim()) n.remove();
  });
}

function buildCard(li) {
  const media = li.querySelector('picture, img');
  const a = li.querySelector('a');
  const card = el('li', 'mm-card');
  const link = el('a', '', { href: a ? a.getAttribute('href') : '#', role: 'link' });
  const mediaBox = el('div', 'mm-media');
  mediaBox.append(media);
  const title = el('div', 'mm-title');
  if (a) title.append(...a.childNodes);
  link.append(mediaBox, title);
  card.append(link);
  return card;
}

function buildMore(li) {
  const a = li.querySelector('a');
  if (!a) return null;
  a.className = 'mm-more-link';
  a.setAttribute('role', 'link');
  const span = el('span');
  span.append(...a.childNodes);
  a.append(span, arrowMore());
  return a;
}

/** the authored link title is the live layout key (English aria-label / data-text) */
function takeKey(link) {
  const key = (link && link.getAttribute('title')) || '';
  if (link) link.removeAttribute('title');
  return key.trim();
}

function buildTabLabel(head) {
  const link = headLink(head);
  const tabLink = link || el('a', '', { role: 'link' });
  if (!link) moveHead(head, tabLink);
  const key = takeKey(link) || tabLink.textContent.trim();
  if (!tabLink.getAttribute('href') || tabLink.getAttribute('href').startsWith('#')) {
    tabLink.setAttribute('href', '#');
    tabLink.addEventListener('click', (e) => e.preventDefault());
  }
  tabLink.className = 'mm-tab-link';
  tabLink.setAttribute('role', 'link');
  tabLink.setAttribute('aria-label', key);
  tabLink.dataset.text = key;
  return tabLink;
}

let menuCount = 0;

/** one tab block (left grid / right feature) or the support columns layout */
function buildBlock(list, side) {
  const tabs = [...list.children].filter((c) => c.matches('li'));
  const columns = side === 'left' && !list.querySelector('picture, img');
  const block = el('div', `mm-block mm-block-${columns ? 'columns' : side}`);
  if (columns) {
    tabs.forEach((li) => {
      const { head, lists } = splitItem(li);
      const col = el('div', 'mm-col');
      const title = el('div', 'mm-col-title');
      title.append(buildTabLabel(head));
      col.append(title);
      if (lists[0]) {
        lists[0].className = 'mm-col-list';
        col.append(lists[0]);
      }
      block.append(col);
    });
    return block;
  }
  const tabList = el('ul', 'mm-tabs');
  const groups = el('div', 'mm-groups');
  tabs.forEach((li, i) => {
    const { head, lists } = splitItem(li);
    const tab = el('li', `mm-tab${i === 0 ? ' is-active' : ''}`);
    tab.dataset.group = i;
    tab.append(buildTabLabel(head));
    // live renders the hover arrow once, on the first tab of the first menu (gated prototype)
    if (i === 0 && menuCount === 1 && side === 'left') tab.append(arrowTab());
    tabList.append(tab);
    const group = el('div', `mm-group${i === 0 ? ' is-active' : ''}`);
    group.dataset.group = i;
    const cards = el('ul', `mm-cards mm-cards-${side === 'right' ? 'feature' : 'grid'}`);
    const more = el('div', 'mm-more');
    const rows = lists[0] ? [...lists[0].children] : [];
    rows.forEach((row) => {
      if (row.querySelector('picture, img')) cards.append(buildCard(row));
      else {
        const m = buildMore(row);
        if (m) more.append(m);
      }
    });
    if (side !== 'right' && cards.children.length && cards.children.length <= 2) {
      cards.classList.add('mm-cards-tall');
    }
    group.append(cards);
    if (more.children.length) group.append(more);
    groups.append(group);
  });
  block.append(tabList, groups);
  return block;
}

/** decorate one top-level nav item in place (the authored <li> stays in its <ul>) */
function decorateItem(li, closable) {
  const { head, lists } = splitItem(li);
  li.className = 'hdr-item';
  const link = headLink(head);
  const key = takeKey(link);
  if (!lists.length) {
    if (link) {
      const text = key || link.textContent.trim();
      link.className = 'hdr-label';
      link.setAttribute('aria-label', text);
      link.dataset.text = text;
      li.replaceChildren(link);
      li.setAttribute('aria-label', text);
    }
    return;
  }
  const label = el('div', 'hdr-label');
  if (link && (link.getAttribute('href') || '').startsWith('#')) label.append(...link.childNodes);
  else moveHead(head, label);
  const text = key || label.textContent.trim();
  label.dataset.text = text;
  const id = `mega-menu-${menuCount}`;
  menuCount += 1;
  li.classList.add('hdr-item-menu');
  Object.entries({
    role: 'button', tabindex: '0', 'aria-label': text, 'aria-expanded': 'false', 'aria-controls': id,
  }).forEach(([k, v]) => li.setAttribute(k, v));
  const mm = el('div', 'mm', { id });
  if (closable) {
    const close = el('button', 'mm-close', { type: 'button', 'aria-label': 'Close menu' });
    close.textContent = '×';
    mm.append(close);
  }
  const inner = el('div', 'mm-inner');
  const left = lists.find((l) => l.matches('ul'));
  const right = lists.find((l) => l.matches('ol'));
  const leftHasMedia = !left || !!left.querySelector('picture, img');
  inner.append(left ? buildBlock(left, 'left') : el('div', 'mm-block mm-block-left'));
  if (leftHasMedia) {
    const rightBlock = right ? buildBlock(right, 'right') : el('div', 'mm-block mm-block-right');
    if (!right) rightBlock.append(el('ul', 'mm-tabs'), el('div', 'mm-groups'));
    inner.append(rightBlock);
  }
  mm.append(inner);
  li.replaceChildren(label, arrowDown(), mm);
}

function sectionContent(fragment, i) {
  const section = fragment.querySelectorAll(':scope > .section')[i];
  if (!section) return [];
  const wrapper = section.querySelector('.default-content-wrapper') || section;
  return [...wrapper.children];
}

/** behaviour observed on the live header (stardust/chrome/header-contract.json) */
function wireBehaviour(hdr) {
  const items = [...hdr.querySelectorAll('.hdr-item-menu')];
  const closeAll = (except) => items.forEach((it) => {
    if (it !== except) {
      it.classList.remove('is-open');
      it.setAttribute('aria-expanded', 'false');
    }
  });
  const setOpen = (it, open) => {
    closeAll(open ? it : null);
    it.classList.toggle('is-open', open);
    it.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  items.forEach((it) => {
    it.addEventListener('mouseenter', () => it.setAttribute('aria-expanded', 'true'));
    it.addEventListener('mouseleave', () => {
      if (it.classList.contains('is-open')) setOpen(it, false);
      else it.setAttribute('aria-expanded', 'false');
    });
    // live: the menu opens on hover only; a click on the trigger closes the hover-opened
    // panel until the pointer leaves the item
    it.addEventListener('click', (e) => {
      if (e.target.closest('.mm') && !e.target.closest('.mm-close')) return;
      setOpen(it, false);
      it.classList.add('is-suppressed');
    });
    it.addEventListener('mouseleave', () => it.classList.remove('is-suppressed'));
    it.addEventListener('keydown', (e) => {
      if (e.target !== it) return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setOpen(it, !it.classList.contains('is-open'));
      }
    });
    // level-2 tabs switch the level-3 group they own (per block); closing resets to the first
    const resets = [];
    it.addEventListener('mouseleave', () => resets.forEach((r) => r()));
    it.querySelectorAll('.mm-block').forEach((block) => {
      const tabs = [...block.querySelectorAll('.mm-tab')];
      const groups = [...block.querySelectorAll('.mm-group')];
      resets.push(() => {
        tabs.forEach((t, i) => t.classList.toggle('is-active', i === 0));
        groups.forEach((g, i) => g.classList.toggle('is-active', i === 0));
      });
      tabs.forEach((tab) => {
        const activate = () => {
          tabs.forEach((t) => t.classList.toggle('is-active', t === tab));
          groups.forEach((g) => {
            const on = g.dataset.group === tab.dataset.group;
            g.classList.toggle('is-active', on);
            // live groups are carousels whose track re-seats (transform 500ms) on switch
            const track = on && g.querySelector('.mm-cards');
            if (track) {
              track.style.transform = 'translateX(-0.01px)';
              requestAnimationFrame(() => { track.style.transform = 'translateX(0)'; });
            }
          });
        };
        tab.addEventListener('mouseenter', activate);
        tab.addEventListener('focusin', activate);
      });
    });
  });

  const accBtn = hdr.querySelector('.hdr-account-btn');
  const login = hdr.querySelector('.hdr-login');
  const isOpen = () => login && login.classList.contains('is-open');
  const toggleLogin = (open) => {
    if (!accBtn || !login) return;
    login.classList.toggle('is-open', open);
    login.setAttribute('aria-hidden', open ? 'false' : 'true');
    accBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = hdr.querySelector('.hdr-item-menu.is-open, .hdr-item-menu:hover');
    items.forEach((it) => setOpen(it, false));
    if (open) {
      hdr.classList.add('is-closing');
      open.focus();
    }
    if (isOpen()) {
      toggleLogin(false);
      accBtn.focus();
    }
  });
  hdr.addEventListener('mousemove', (e) => {
    if (!e.target.closest('.mm-close')) hdr.classList.remove('is-closing');
  });
  document.addEventListener('click', (e) => {
    if (!hdr.contains(e.target)) closeAll(null);
  });

  if (accBtn && login) {
    accBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleLogin(!isOpen());
    });
    accBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleLogin(!isOpen());
      }
    });
    document.addEventListener('click', (e) => {
      if (isOpen() && !login.contains(e.target)) toggleLogin(false);
    });
  }
}

/**
 * loads and decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navPath = getChromePath('nav');
  const fragment = await loadFragment(navPath);
  block.textContent = '';
  if (!fragment) return;
  unbutton(fragment);
  menuCount = 0;
  const closable = navPath === '/nav';

  const hdr = el('div', `hdr${closable ? ' hdr-root' : ''}`, { id: 'site-header' });

  // 1 — promo bar
  const promo = el('div', 'hdr-promo');
  promo.append(...sectionContent(fragment, 0));

  // 2 — brand
  const bar = el('div', 'hdr-bar');
  const logo = el('div', 'hdr-logo');
  const brand = sectionContent(fragment, 1);
  brand.forEach((n) => {
    const a = n.querySelector('a');
    if (a) {
      a.classList.add('hdr-logo-link');
      const img = a.querySelector('img');
      if (img) {
        a.setAttribute('aria-label', img.getAttribute('alt') || 'Home');
        img.setAttribute('loading', 'eager');
        img.setAttribute('width', '40');
        img.setAttribute('height', '40');
      }
    }
  });
  logo.append(...brand);
  bar.append(logo);

  // 3 — main nav (the authored <ul> stays the menubar)
  const nav = sectionContent(fragment, 2).find((n) => n.matches('ul'));
  if (nav) {
    nav.className = 'hdr-nav';
    nav.setAttribute('role', 'menubar');
    nav.setAttribute('aria-label', 'Main Navigation');
    [...nav.children].forEach((li) => decorateItem(li, closable));
    bar.append(nav);
  }

  // 4 — tools: utility nav, search, cart, account + sign-in dropdown
  const utils = el('div', 'hdr-utils');
  const tools = sectionContent(fragment, 3);
  const utilNav = tools.find((n) => n.matches('ul'));
  if (utilNav) {
    utilNav.className = 'hdr-nav hdr-nav-utils';
    utilNav.setAttribute('role', 'menubar');
    utilNav.setAttribute('aria-label', 'Main Navigation');
    [...utilNav.children].forEach((li) => decorateItem(li, closable));
    utils.append(utilNav);
  }
  const search = el('div', 'hdr-search', {
    role: 'button', tabindex: '0', 'aria-label': 'Open search', 'aria-expanded': 'false',
  });
  const searchSvg = svg(42, 42, '0 0 42 42', SEARCH_D, null, '');
  searchSvg.setAttribute('focusable', 'false');
  search.append(searchSvg);
  utils.append(search);

  const paras = tools.filter((n) => n.matches('p'));
  const cartP = paras.find((p) => p.querySelector('a img, a picture'));
  const accountP = paras.find((p) => p !== cartP && p.querySelector('img') && !p.querySelector('a'));
  const loginP = paras.find((p) => p !== cartP && p !== accountP && p.querySelector('a'));
  if (cartP) {
    const util = el('div', 'hdr-util');
    const a = cartP.querySelector('a');
    a.classList.add('hdr-icon');
    a.setAttribute('role', 'link');
    const img = a.querySelector('img');
    if (img) {
      a.setAttribute('aria-label', img.getAttribute('alt'));
      img.setAttribute('alt', '');
    }
    util.append(cartP);
    utils.append(util);
  }
  if (accountP) {
    const util = el('div', 'hdr-util');
    const icon = el('div', 'hdr-icon hdr-account');
    const btn = el('div', 'hdr-account-btn', {
      role: 'button', tabindex: '0', 'aria-label': 'account', 'aria-expanded': 'false', 'aria-controls': 'login-modal-dropdown',
    });
    const img = accountP.querySelector('img');
    if (img) img.setAttribute('alt', '');
    btn.append(accountP);
    icon.append(btn);
    if (loginP) {
      const loginWrap = el('div', 'hdr-login', { id: 'login-modal-dropdown', tabindex: '-1', 'aria-hidden': 'true' });
      const box = el('div', 'hdr-login-box');
      loginP.querySelector('a').classList.add('hdr-login-link');
      box.append(loginP);
      loginWrap.append(box);
      icon.append(loginWrap);
    }
    util.append(icon);
    utils.append(util);
  }
  bar.append(utils);

  hdr.append(promo, bar);
  block.append(hdr);
  wireBehaviour(hdr);
}
