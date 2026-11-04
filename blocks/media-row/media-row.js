/**
 * media-row — two-column image / text row (live .contentBlockContainer).
 *
 * Authoring: one row, two cells in display order — a text cell (heading +
 * description paragraphs) and a media cell (one image). Either order; the
 * authored order is the visual order (rows alternate on the page).
 * A footnote reference link (#fnN) in the copy makes the row its return target
 * (id fnN-ref), as the live page does.
 */

function wrapNode(node, className) {
  const w = document.createElement('div');
  w.className = className;
  w.append(node);
  return w;
}

const isMedia = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');

function buildText(nodes) {
  const text = document.createElement('div');
  text.className = 'media-row-text';
  let desc = null;
  nodes.forEach((node) => {
    if (/^H[1-6]$/.test(node.tagName)) {
      text.append(wrapNode(node, 'media-row-title'));
      desc = null;
      return;
    }
    if (!desc) {
      desc = document.createElement('div');
      desc.className = 'media-row-desc';
      text.append(desc);
    }
    desc.append(node);
  });
  return text;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .media-row-grid')) return;
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const grid = document.createElement('div');
  grid.className = 'media-row-grid';

  cells.forEach((cell) => {
    const kids = [...cell.children];
    if (!kids.length && !cell.textContent.trim()) return;
    const out = document.createElement('div');
    out.className = 'media-row-cell';
    const mediaOnly = kids.length && kids.every((k) => isMedia(k) && !k.textContent.trim());
    if (mediaOnly) {
      const media = document.createElement('div');
      media.className = 'media-row-media';
      kids.forEach((k) => media.append(k.matches('picture, img') ? k : k.querySelector('picture, img')));
      out.append(media);
    } else {
      out.append(buildText(kids));
    }
    grid.append(out);
  });

  const ref = block.querySelector('a[href^="#fn"]');
  if (ref) {
    const id = `${ref.getAttribute('href').slice(1)}-ref`;
    if (!document.getElementById(id)) block.id = id;
  }
  block.replaceChildren(grid);
}
