(function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', function () {
    var isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A' && nav.classList.contains('is-open')) {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
})();

(function () {
  var rows = document.querySelectorAll('.awards-row');
  rows.forEach(function (row) {
    row.addEventListener('click', function () {
      var isOpen = row.getAttribute('aria-expanded') === 'true';
      row.setAttribute('aria-expanded', String(!isOpen));
    });
  });
})();

(function () {
  // Chopped corners on .stamp-container — a big quarter-circle bite out of
  // each corner. Computed in JS (not a CSS mask) because the perforated-edge
  // mask already tiles dot patterns right up to the corners, and layering a
  // second masked shape on top produces messy overlapping-hole artifacts;
  // clip-path cuts the corners independently of that mask entirely. Needs
  // real pixel coordinates (not CSS %) since arcs need to stay circular
  // regardless of the container's aspect ratio, so it's recalculated on
  // resize rather than done as a static objectBoundingBox SVG clip-path.
  var containers = document.querySelectorAll('.stamp-container');
  if (!containers.length) return;
  var R = 36;

  function chopPath(w, h) {
    return 'path("M ' + R + ',0 L ' + (w - R) + ',0 ' +
      'A ' + R + ',' + R + ' 0 0 0 ' + w + ',' + R + ' ' +
      'L ' + w + ',' + (h - R) + ' ' +
      'A ' + R + ',' + R + ' 0 0 0 ' + (w - R) + ',' + h + ' ' +
      'L ' + R + ',' + h + ' ' +
      'A ' + R + ',' + R + ' 0 0 0 0,' + (h - R) + ' ' +
      'L 0,' + R + ' ' +
      'A ' + R + ',' + R + ' 0 0 0 ' + R + ',0 Z")';
  }

  function apply() {
    containers.forEach(function (el) {
      var path = chopPath(el.offsetWidth, el.offsetHeight);
      el.style.clipPath = path;
      el.style.webkitClipPath = path;
    });
  }

  apply();
  window.addEventListener('resize', apply);
})();
