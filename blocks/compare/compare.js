/**
 * compare — plan comparison table (live .service-compare-container), rendered
 * column-major like the source: one column per plan, head on top.
 *
 * Authoring: a genuine data table — one row per table row, one cell per column.
 *   row 1 (head row): first cell empty (label column), then per plan a heading
 *     (<h3>) or a logo image.
 *   rows 2..N: first cell the row label (<strong>), then one value per plan —
 *     text, a tick image, "-" (not included, drawn larger) or empty.
 * The section heading above the block is default content; the block reabsorbs it.
 */

function reabsorbHead(block) {
  const wrapper = block.parentElement;
  const prev = wrapper && wrapper.previousElementSibling;
  if (!prev || !prev.classList.contains('default-content-wrapper')) return null;
  const head = document.createElement('div');
  head.className = 'compare-heading';
  head.append(...prev.childNodes);
  prev.remove();
  return head;
}

const isHeadRow = (row) => {
  const cells = [...row.children];
  return cells.some((c) => c.querySelector('h1, h2, h3, h4, h5, h6, picture, img'))
    && !cells.some((c) => c.querySelector('strong'));
};

export default function decorate(block) {
  if (block.querySelector(':scope > .compare-table')) return;
  const head = reabsorbHead(block);
  const rows = [...block.children];
  const ncols = Math.max(0, ...rows.map((r) => r.children.length));

  const table = document.createElement('div');
  table.className = 'compare-table';
  table.setAttribute('role', 'table');
  table.style.gridTemplateColumns = `repeat(${ncols}, auto)`;

  const cols = [];
  for (let i = 0; i < ncols; i += 1) {
    const col = document.createElement('div');
    col.className = 'compare-col';
    cols.push(col);
    table.append(col);
  }

  rows.forEach((row, r) => {
    const headRow = r === 0 && isHeadRow(row);
    [...row.children].forEach((cell, c) => {
      cell.className = headRow ? 'compare-head' : 'compare-cell';
      if (headRow) cell.setAttribute('role', 'columnheader');
      else if (cell.textContent.trim() === '-') cell.classList.add('compare-cell-dash');
      cols[c].append(cell);
    });
  });

  block.replaceChildren(...(head ? [head] : []), table);
}
