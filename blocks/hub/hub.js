/**
 * hub — image tile grid with centred overlay titles and outline link pills (live motoverse
 * grid, ofp-fe-moto-motoverse-grid). Two tiles per row; a hub holding a single tile shows it
 * full width (live full-width-item).
 *
 * Authoring: the section heading above the block is default content; the block reabsorbs it.
 * One tile per row (cells are read in order): picture, title paragraph, then a list (<ul>)
 * of links — the pills. The title paragraph may also be a heading.
 */

const isMedia = (el) => el.matches('picture, img') || !!el.querySelector('picture, img');

function make(className, ...nodes) {
  const d = document.createElement('div');
  d.className = className;
  d.append(...nodes);
  return d;
}

// EW8: the default-content head moves in whole; the emptied wrapper is removed
function reabsorbHead(block) {
  const wrapper = block.parentElement;
  const prev = wrapper && wrapper.previousElementSibling;
  if (!prev || !prev.classList.contains('default-content-wrapper')) return [];
  const nodes = [...prev.children];
  prev.remove();
  return nodes;
}

function buildTile(nodes) {
  const tile = make('hub-item');
  const content = make('hub-content');
  let ctas = null;
  nodes.forEach((node) => {
    if (isMedia(node) && !node.textContent.trim()) {
      tile.prepend(make('hub-img', node.matches('picture, img') ? node : node.querySelector('picture, img')));
      return;
    }
    if (node.matches('ul, ol')) {
      if (!ctas) {
        ctas = make('hub-ctas');
        content.append(ctas);
      }
      ctas.append(node);
      return;
    }
    if (!content.querySelector('.hub-title')) {
      const title = make('hub-title', node);
      if (!/^H[1-6]$/.test(node.tagName)) {
        title.setAttribute('role', 'heading');
        title.setAttribute('aria-level', '2');
      }
      content.prepend(title);
      return;
    }
    content.append(node);
  });
  tile.append(content);
  return tile;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .hub-grid')) return;
  const head = make('hub-heading', ...reabsorbHead(block));
  const grid = make('hub-grid');
  [...block.children].forEach((row) => {
    const nodes = [];
    [...row.children].forEach((cell) => nodes.push(...cell.children));
    if (nodes.length) grid.append(buildTile(nodes));
  });
  if (grid.children.length === 1) grid.firstElementChild.classList.add('hub-wide');
  block.replaceChildren(head, grid);
}
