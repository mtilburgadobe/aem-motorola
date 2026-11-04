/* motorola AT replica — chrome + widget behaviour (observed on the live site; no framework) */
(function () {
  'use strict';
  var header = document.getElementById('site-header');

  /* ---- Mega menu: hover (CSS) + click/Enter toggle, Escape closes, aria-expanded follows ---- */
  if (header) {
    var items = Array.prototype.slice.call(header.querySelectorAll('.hdr__item--menu'));
    var closeAll = function (except) {
      items.forEach(function (it) {
        if (it !== except) { it.classList.remove('is-open'); it.setAttribute('aria-expanded', 'false'); }
      });
    };
    var setOpen = function (it, open) {
      closeAll(open ? it : null);
      it.classList.toggle('is-open', open);
      it.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    items.forEach(function (it) {
      it.addEventListener('mouseenter', function () { it.setAttribute('aria-expanded', 'true'); });
      it.addEventListener('mouseleave', function () { if (!it.classList.contains('is-open')) it.setAttribute('aria-expanded', 'false'); else setOpen(it, false); });
      it.addEventListener('click', function (e) {
        if (e.target.closest('.mm')) return;          // links inside the panel navigate
        setOpen(it, !it.classList.contains('is-open'));
      });
      it.addEventListener('keydown', function (e) {
        if (e.target !== it) return;
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(it, !it.classList.contains('is-open')); }
      });
      /* level-2 tabs switch the level-3 group they own (per block) */
      Array.prototype.forEach.call(it.querySelectorAll('.mm__block'), function (block) {
        var tabs = block.querySelectorAll('.mm__tab');
        var groups = block.querySelectorAll('.mm__group');
        Array.prototype.forEach.call(tabs, function (tab) {
          var activate = function () {
            var g = tab.getAttribute('data-group');
            Array.prototype.forEach.call(tabs, function (t) { t.classList.toggle('is-active', t === tab); });
            Array.prototype.forEach.call(groups, function (gr) { gr.classList.toggle('is-active', gr.getAttribute('data-group') === g); });
          };
          tab.addEventListener('mouseenter', activate);
          tab.addEventListener('focusin', activate);
        });
      });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      var open = header.querySelector('.hdr__item--menu.is-open, .hdr__item--menu:hover');
      items.forEach(function (it) { setOpen(it, false); });
      if (open) { header.classList.add('is-closing'); open.focus(); }
      var login = document.getElementById('login-modal-dropdown');
      if (login && !login.hidden) { login.hidden = true; var b = header.querySelector('.hdr__account-btn'); if (b) { b.setAttribute('aria-expanded', 'false'); b.focus(); } }
    });
    header.addEventListener('mousemove', function () { header.classList.remove('is-closing'); });
    document.addEventListener('click', function (e) {
      if (!header.contains(e.target)) { closeAll(null); }
    });

    /* ---- Account dropdown (click) ---- */
    var accBtn = header.querySelector('.hdr__account-btn');
    var login = document.getElementById('login-modal-dropdown');
    if (accBtn && login) {
      var toggleLogin = function (open) {
        login.hidden = !open;
        accBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      };
      accBtn.addEventListener('click', function (e) { e.stopPropagation(); toggleLogin(login.hidden); });
      accBtn.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleLogin(login.hidden); } });
      document.addEventListener('click', function (e) { if (!login.hidden && !login.contains(e.target)) toggleLogin(false); });
    }
  }

  /* ---- Product-card CTA labels: the source nests the label link inside the card link (DOM parity) ---- */
  Array.prototype.forEach.call(document.querySelectorAll('.js-link'), function (sp) {
    var a = document.createElement('a');
    if (sp.dataset.href) a.setAttribute('href', sp.dataset.href);
    if (sp.hasAttribute('aria-label')) a.setAttribute('aria-label', sp.getAttribute('aria-label'));
    a.className = 'btn__label';
    while (sp.firstChild) a.appendChild(sp.firstChild);
    sp.parentNode.replaceChild(a, sp);
  });

  /* ---- Trending tabs: active tab + sliding underline (live: width/transform transition) ---- */
  Array.prototype.forEach.call(document.querySelectorAll('.trend__tabs'), function (list) {
    var tabs = list.querySelectorAll('.trend__tab');
    var slider = list.querySelector('.trend__slider');
    var place = function (t) { if (slider) { slider.style.width = t.offsetWidth + 'px'; slider.style.transform = 'translateX(' + (t.offsetLeft) + 'px)'; } };
    Array.prototype.forEach.call(tabs, function (t) {
      t.addEventListener('click', function () {
        Array.prototype.forEach.call(tabs, function (o) { o.classList.toggle('is-active', o === t); o.classList.toggle('active', o === t); o.setAttribute('aria-selected', o === t ? 'true' : 'false'); });
        place(t);
      });
    });
  });

  /* ---- Footer accordions (≤767px) ---- */
  Array.prototype.forEach.call(document.querySelectorAll('.ftr__col-title'), function (t) {
    t.addEventListener('click', function () {
      if (!window.matchMedia('(max-width: 767px)').matches) return;
      t.parentElement.classList.toggle('is-open');
    });
  });

  /* ---- Legal note disclosure ---- */
  Array.prototype.forEach.call(document.querySelectorAll('.legal__head'), function (h) {
    var text = document.getElementById(h.getAttribute('aria-controls'));
    var toggle = function () {
      var open = h.getAttribute('aria-expanded') !== 'true';
      h.setAttribute('aria-expanded', open ? 'true' : 'false');
      h.classList.toggle('expand', open);
      if (text) text.hidden = !open;
    };
    h.addEventListener('click', toggle);
    h.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });

  /* ---- Forms: no backend connected (decision D1) ---- */
  Array.prototype.forEach.call(document.querySelectorAll('form[data-no-backend]'), function (f) {
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var s = f.querySelector('.form-status');
      if (!s) { s = document.createElement('p'); s.className = 'form-status'; s.setAttribute('role', 'status'); s.textContent = 'Kein Backend verbunden – das Formular wurde nicht gesendet.'; f.appendChild(s); }
      s.hidden = false;
    });
  });
})();
