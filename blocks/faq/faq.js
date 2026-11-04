/**
 * faq — question / answer accordion (live ofp-fe-2c-accordion): a bold section head, then
 * rows with the question and a plus toggle; clicking the row (or the toggle) reveals the
 * answer below it. All rows start closed, as live.
 *
 * Authoring: a one-cell row holding a paragraph or heading is the section head (first row).
 * Every two-cell row is one item: question (paragraph, usually <strong>) | answer (any
 * prose — paragraphs, lists, links).
 */

let uid = 0;

function make(className, ...nodes) {
  const d = document.createElement('div');
  d.className = className;
  d.append(...nodes);
  return d;
}

function buildItem(qCell, aCell) {
  uid += 1;
  const id = `faq-${uid}`;
  const question = make('faq-question', ...qCell.childNodes);
  question.setAttribute('role', 'heading');
  question.setAttribute('aria-level', '3');
  question.id = `${id}-q`;

  // EW7: the button is a chevron-only toggle; the question text lives beside it
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'faq-toggle';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', `${id}-a`);
  toggle.setAttribute('aria-label', question.textContent.trim());

  const answer = make('faq-answer', ...aCell.childNodes);
  answer.id = `${id}-a`;
  answer.setAttribute('role', 'region');
  answer.setAttribute('aria-labelledby', question.id);
  answer.hidden = true;

  const row = make('faq-row', question, toggle);
  const item = make('faq-item', row, answer, make('faq-sep'));
  const flip = () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    answer.hidden = !open;
    item.classList.toggle('open', open);
  };
  row.addEventListener('click', (e) => {
    if (e.target.closest('a')) return;
    if (e.target !== toggle && !toggle.contains(e.target)) flip();
  });
  toggle.addEventListener('click', flip);
  return item;
}

export default function decorate(block) {
  if (block.querySelector(':scope > .faq-inner')) return;
  const inner = make('faq-inner');
  const list = make('faq-list');
  [...block.children].forEach((row) => {
    const cells = [...row.children].filter((c) => c.textContent.trim() || c.children.length);
    if (cells.length >= 2) {
      list.append(buildItem(cells[0], cells[1]));
    } else if (cells.length === 1 && !list.children.length) {
      const head = make('faq-heading', ...cells[0].childNodes);
      if (!head.querySelector('h1, h2, h3, h4, h5, h6')) {
        head.setAttribute('role', 'heading');
        head.setAttribute('aria-level', '2');
      }
      inner.append(head);
    }
  });
  inner.append(list);
  block.replaceChildren(inner);
}
