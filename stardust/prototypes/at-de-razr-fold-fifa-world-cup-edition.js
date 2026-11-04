/* at-de-razr-fold-fifa-world-cup-edition — sticky sub-nav.
   Live .sticky-nav-container gains `.sticky` (position:fixed under the header) as soon as the page
   scrolls, with no placeholder: the content below jumps up by the bar height, as live.
   ≤767px: live keeps reporting the un-shrunk document height (the stitched live capture spans the
   full in-flow height), so the build pads the body by the bar height while the bar is fixed — keeps
   the document height constant (and the stitched capture scrollable to the end). */
(function () {
  'use strict';
  var nav = document.querySelector('.subnav');
  if (!nav) return;
  var bar = nav.querySelector('.subnav__bar');
  var mq = window.matchMedia('(max-width: 767px)');
  var headerH = function () {
    var v = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h'));
    return isNaN(v) ? 88 : v;
  };
  var anchor = nav.getBoundingClientRect().top + window.scrollY;
  var onScroll = function () {
    var fixed = window.scrollY > anchor - headerH();
    if (fixed === nav.classList.contains('is-fixed')) return;
    var h = bar.offsetHeight;
    nav.classList.toggle('is-fixed', fixed);
    document.body.style.paddingBottom = fixed && mq.matches ? h + 'px' : '';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

/* Product carousel: the pagination drives BOTH tracks in sync (live: one dot click slid the left and
   right carousels together — track transform .3s; live region "Item n of N"). */
(function () {
  'use strict';
  document.querySelectorAll('.pcarousel').forEach(function (root) {
    var tracks = root.querySelectorAll('.pcarousel__track');
    var dots = root.querySelectorAll('.pcarousel__dot');
    var go = function (i) {
      tracks.forEach(function (t) {
        var rail = t.querySelector('.pcarousel__rail');
        var n = rail.children.length;
        var k = Math.max(0, Math.min(i, n - 1));
        rail.style.transform = 'translateX(' + (-100 * k) + '%)';
        Array.prototype.forEach.call(rail.children, function (s, j) { s.classList.toggle('is-active', j === k); });
        var live = t.querySelector('[aria-live]');
        if (live) live.textContent = 'Item ' + (k + 1) + ' of ' + n;
      });
      dots.forEach(function (d, j) {
        d.classList.toggle('is-active', j === i);
        if (j === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
    };
    dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });
  });
})();

/* Digital experience: an icon toggles its media layer (default layer fades out .4s, the chosen layer
   fades in; icon .active, as live). A second click restores the default layer. */
(function () {
  'use strict';
  document.querySelectorAll('.dexp').forEach(function (root) {
    var btns = root.querySelectorAll('.dexp__btn');
    var layers = root.querySelectorAll('.dexp__layer');
    var set = function (n) {
      btns.forEach(function (b) {
        var on = +b.getAttribute('data-layer') === n;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
      layers.forEach(function (l, i) { l.classList.toggle('is-active', i === n); });
      root.classList.toggle('is-expanded', n > 0);
    };
    btns.forEach(function (b) {
      var n = +b.getAttribute('data-layer');
      var act = function () { set(b.classList.contains('is-active') ? 0 : n); };
      b.addEventListener('click', act);
      b.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); act(); } });
    });
  });
})();

/* Flex view: hover swaps the tile image and reveals its CTA (live imgHide/imgDisplay + hoveredFlexCta). */
(function () {
  'use strict';
  document.querySelectorAll('.flexview__item').forEach(function (item) {
    var cta = item.querySelector('.flexview__cta');
    var on = function (v) { item.classList.toggle('is-hovered', v); if (cta) cta.hidden = !v; };
    item.addEventListener('mouseenter', function () { on(true); });
    item.addEventListener('mouseleave', function () { on(false); });
    item.addEventListener('focusin', function () { on(true); });
    item.addEventListener('focusout', function () { on(false); });
  });
})();
