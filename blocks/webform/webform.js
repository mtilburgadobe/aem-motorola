/**
 * webform — registration form (live moto-cms-webform, post-registration): headline, field
 * groups (one or two columns), checkbox options that enable their dependent fields, a file
 * upload and a centred submit button. No backend is connected (dynamic-features decision
 * D1): submit validates the required fields and shows a status line instead of sending.
 * The block carries the live anchor id `moto-webform` so in-page links can target it.
 *
 * Authoring — one row per item, in display order:
 *   - a one-cell row with a heading: h2 = form headline, h3 = group title (opens a group)
 *   - a field row: label paragraph | placeholder paragraph (may be empty) | option words
 *     The label cell may hold a second paragraph: the template-download link label.
 *   - the submit row: button label | (empty) | submit
 * @variants options cell: required | date | file | checkbox | disabled | submit | group | group-2
 *   group opens a one-column group, group-2 a two-column group; a checkbox enables the
 *   disabled fields that follow it in its group.
 * @ew-exempt <p> options cell (cell 3) — field metadata, never displayed
 * @ew-exempt <p> placeholder cell (cell 2) — rendered as the input placeholder attribute
 */

const STATUS = 'Kein Backend verbunden – das Formular wurde nicht gesendet.';
const OPTIONS = ['required', 'date', 'file', 'checkbox', 'disabled', 'submit', 'group', 'group-2'];

let uid = 0;

function make(tag, className, ...nodes) {
  const d = document.createElement(tag);
  if (className) d.className = className;
  d.append(...nodes);
  return d;
}

function words(cell) {
  if (!cell) return [];
  return cell.textContent.toLowerCase().split(/[\s,]+/).filter((w) => OPTIONS.includes(w));
}

function buildField(cells, opts) {
  uid += 1;
  const id = `webform-${uid}`;
  const [labelCell, phCell] = cells;
  const paras = [...labelCell.children];
  const field = make('div', 'webform-field');
  if (opts.includes('disabled')) field.classList.add('disabled');

  if (opts.includes('checkbox')) {
    const box = document.createElement('input');
    box.type = 'checkbox';
    box.id = id;
    box.name = id;
    const label = make('label', 'webform-option', box, ...paras);
    label.htmlFor = id;
    field.classList.add('webform-check');
    field.append(label);
    return { field, input: box };
  }

  const label = make('label', '', ...(paras.length ? [paras[0]] : []));
  label.htmlFor = id;
  const name = make('div', 'webform-name', label);
  if (opts.includes('required')) {
    const star = make('span', 'webform-star', ' *');
    star.setAttribute('aria-hidden', 'true');
    label.append(star);
  }
  if (paras[1]) {
    const dl = make('button', 'webform-download', paras[1]);
    dl.type = 'button';
    name.append(dl);
  }
  let type = 'text';
  if (opts.includes('date')) type = 'date';
  if (opts.includes('file')) type = 'file';
  const input = document.createElement('input');
  input.type = type;
  input.id = id;
  input.name = id;
  const ph = phCell ? phCell.textContent.trim() : '';
  if (ph && type === 'text') input.placeholder = ph;
  if (type === 'file') input.accept = '.csv';
  if (opts.includes('required')) input.required = true;
  if (opts.includes('disabled')) input.disabled = true;
  field.append(name, input);
  return { field, input };
}

export default function decorate(block) {
  if (block.querySelector(':scope > .webform-inner')) return;
  if (!block.id) block.id = 'moto-webform';
  const inner = make('div', 'webform-inner');
  const form = document.createElement('form');
  form.noValidate = true;
  let group = null;
  let lastCheck = null;
  const open = (cols) => {
    group = make('div', `webform-group${cols === 2 ? ' webform-cols-2' : ''}`);
    form.append(group);
    lastCheck = null;
  };

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const heading = cells[0] && cells[0].querySelector('h1, h2, h3, h4, h5, h6');
    if (heading && cells.slice(1).every((c) => !c.textContent.trim())) {
      if (!form.children.length && /^H[12]$/.test(heading.tagName)) {
        inner.append(make('div', 'webform-headline', ...cells[0].children));
        return;
      }
      open(1);
      group.append(make('div', 'webform-title', ...cells[0].children));
      return;
    }
    const opts = words(cells[2]);
    if (opts.includes('submit')) {
      const btn = make('button', 'webform-submit', ...cells[0].children);
      btn.type = 'submit';
      form.append(make('div', 'webform-cta', btn));
      return;
    }
    if (!cells[0] || !cells[0].textContent.trim()) return;
    if (opts.includes('group-2')) open(2);
    else if (opts.includes('group') || !group) open(1);
    const { field, input } = buildField(cells, opts);
    group.append(field);
    if (opts.includes('checkbox')) {
      lastCheck = input;
    } else if (lastCheck && input.disabled) {
      const check = lastCheck;
      check.addEventListener('change', () => {
        input.disabled = !check.checked;
        field.classList.toggle('disabled', !check.checked);
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('input[required]').forEach((i) => {
      const bad = !i.disabled && !i.value.trim();
      i.setAttribute('aria-invalid', String(bad));
      if (bad) ok = false;
    });
    let s = form.querySelector('.webform-status');
    if (!s) {
      s = make('p', 'webform-status');
      s.setAttribute('role', 'status');
      form.append(s);
    }
    s.textContent = ok ? STATUS : `${STATUS} (*)`;
  });

  inner.append(form);
  block.replaceChildren(inner);
}
