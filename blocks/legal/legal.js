/**
 * legal — legal-note disclosure (live moto-cms-legal): a bold "legal notice" head row with
 * a chevron; clicking the row (or Enter / Space) reveals the fine print.
 *
 * Authoring: row 1 = the head text (a heading or a paragraph); following rows (or the
 * rest of a flattened cell) = the fine print (paragraphs, lists).
 *
 * @variants block: plain — always-open fine print, no head row (live moto-flex-content legal copy
 *   on the program template); every authored node is the fine print.
 * @variants block: spaced — extra room below the head row (live brilliant collection legal +
 *   html_upload strip, 162px)
 */

function make(tag, className, ...nodes) {
  const d = document.createElement(tag);
  d.className = className;
  d.append(...nodes);
  return d;
}

function cellNodes(cell) {
  const kids = [...cell.children];
  if (!kids.length && cell.textContent.trim()) {
    // harness-only fallback: bare text cell — wrap the existing text nodes
    const p = document.createElement('p');
    p.append(...cell.childNodes);
    return [p];
  }
  return kids;
}

let uid = 0;

export default function decorate(block) {
  if (block.querySelector(':scope > .legal-inner')) return; // re-entrant
  const nodes = [...block.children].flatMap((row) => [...row.children].flatMap(cellNodes));
  if (block.classList.contains('plain')) {
    block.replaceChildren(make('div', 'legal-inner', make('div', 'legal-text', ...nodes)));
    return;
  }
  const headNode = nodes.find((n) => /^H[1-6]$/.test(n.tagName)) || nodes[0];
  const body = nodes.filter((n) => n !== headNode);

  uid += 1;
  const textId = `legal-text-${uid}`;
  const text = make('div', 'legal-text', ...body);
  text.id = textId;
  text.hidden = true;

  const icon = make('i', 'legal-icon');
  icon.setAttribute('aria-hidden', 'true');
  // EW7: the head row is a div control; the authored text stays an editable element
  const head = make('div', 'legal-head', make('div', 'legal-title', ...(headNode ? [headNode] : [])), icon);
  head.setAttribute('role', 'button');
  head.setAttribute('aria-expanded', 'false');
  head.setAttribute('aria-controls', textId);
  head.tabIndex = 0;
  const toggle = () => {
    const open = head.getAttribute('aria-expanded') !== 'true';
    head.setAttribute('aria-expanded', open ? 'true' : 'false');
    head.classList.toggle('expand', open);
    text.hidden = !open;
  };
  head.addEventListener('click', toggle);
  head.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggle();
    }
  });

  block.replaceChildren(make('div', 'legal-inner', head, text));
}
