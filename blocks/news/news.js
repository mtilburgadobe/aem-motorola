/**
 * news — newsletter sign-up band (live moto newsletter): centred headline, a pill email
 * field joined to a navy submit control, and a consent checkbox with the privacy link.
 * No backend is connected (dynamic-features decision D1): submit shows a status line.
 *
 * Authoring (one cell, in order): headline (heading), email field label (also used as
 * the field placeholder), submit label, consent text paragraph(s), privacy link.
 */

const STATUS = 'Kein Backend verbunden – das Formular wurde nicht gesendet.';

const isHeading = (el) => /^H[1-6]$/.test(el.tagName);

function make(tag, className, ...nodes) {
  const d = document.createElement(tag);
  if (className) d.className = className;
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
  if (block.querySelector(':scope > .news-inner')) return; // re-entrant
  const nodes = [...block.children].flatMap((row) => [...row.children].flatMap(cellNodes));
  const heading = nodes.find(isHeading);
  const links = nodes.filter((n) => n !== heading && n.querySelector('a'));
  const texts = nodes.filter((n) => n !== heading && !links.includes(n));
  const [fieldLabel, submitLabel, ...consent] = texts;

  uid += 1;
  const id = `news-${uid}`;
  const headline = make('div', 'news-headline');
  if (heading) {
    heading.id = `${id}-heading`;
    headline.append(heading);
  }

  const form = make('form', 'news-form');
  form.noValidate = true;
  const row = make('div', 'news-row');
  row.setAttribute('role', 'group');
  if (heading) row.setAttribute('aria-labelledby', heading.id);

  const input = document.createElement('input');
  input.type = 'email';
  input.id = `${id}-email`;
  input.required = true;
  input.setAttribute('aria-required', 'true');
  const field = make('div', 'news-field');
  if (fieldLabel) {
    input.placeholder = fieldLabel.textContent.trim();
    const label = make('label', 'news-label', fieldLabel);
    label.htmlFor = input.id;
    field.append(label);
  }
  field.append(input);

  // EW7: the submit label stays an editable paragraph inside a div control
  const submit = make('div', 'news-submit-btn', ...(submitLabel ? [submitLabel] : []));
  submit.setAttribute('role', 'button');
  submit.tabIndex = 0;
  submit.addEventListener('click', () => form.requestSubmit());
  submit.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      form.requestSubmit();
    }
  });

  const check = document.createElement('input');
  check.type = 'checkbox';
  check.id = `${id}-terms`;
  check.required = true;
  check.setAttribute('aria-required', 'true');
  const consentLabel = make('label', '', make('span', '', ...consent), ...links);
  consentLabel.htmlFor = check.id;

  row.append(field, make('div', 'news-submit', submit), make('div', 'news-check', check, consentLabel));
  form.append(row);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let s = form.querySelector('.form-status');
    if (!s) {
      s = make('p', 'form-status');
      s.setAttribute('role', 'status');
      s.textContent = STATUS;
      form.append(s);
    }
    s.hidden = false;
  });

  block.replaceChildren(make('div', 'news-inner', headline, form));
}
