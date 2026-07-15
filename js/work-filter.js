(function () {
  var filterBar = document.querySelector('[data-filter-bar]');
  var cards = document.querySelectorAll('.card[data-track]');
  if (!filterBar || !cards.length) return;

  var buttons = filterBar.querySelectorAll('[data-filter]');
  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var EXIT_DELAY = reduceMotion ? 0 : 200; // matches --duration-base

  function applyFilter(value, animate) {
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.filter === value));
    });
    cards.forEach(function (card) {
      var match = value === 'all' || card.dataset.track === value;
      if (!animate) {
        card.hidden = !match;
        return;
      }
      if (match) {
        card.hidden = false;
        // Force the entering state before un-hiding so removing it next frame is a real transition.
        card.classList.add('is-filtered-out');
        requestAnimationFrame(function () {
          card.classList.remove('is-filtered-out');
        });
      } else {
        card.classList.add('is-filtered-out');
        window.setTimeout(function () {
          if (card.classList.contains('is-filtered-out')) card.hidden = true;
        }, EXIT_DELAY);
      }
    });
  }

  filterBar.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-filter]');
    if (!btn) return;
    applyFilter(btn.dataset.filter, true);
  });

  applyFilter('all', false);
})();
