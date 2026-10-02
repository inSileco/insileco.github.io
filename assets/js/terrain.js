/**
 * Teal bands terrain light wave (ANI-11)
 * Starts the wave of light on the dark bands' terrain (CSS .is-waving,
 * _animations.scss) every few seconds while the band is on screen, and removes
 * the class when the wave has crossed: moving a background repaints the layer,
 * so nothing runs between two waves. Without IntersectionObserver or with
 * reduced motion it never runs.
 */
(function () {
  "use strict";

  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // One wave every CYCLE ms (it lasts $terrain-wave-travel, _variables.scss),
  // the first one shortly after the band shows up. Desktop only, as the CSS
  // ($breakpoint-desktop): no timers on phones and tablets.
  var CYCLE = 8000;
  var FIRST = 600;
  var desktop = window.matchMedia("(min-width: 1024px)");

  document.addEventListener("DOMContentLoaded", function () {
    var bands = document.querySelectorAll(".has-texture--on-dark:not(.page-header):not(.notfound-hero)");
    if (!bands.length) return;

    bands.forEach(function (band) {
      band.addEventListener("animationend", function (event) {
        if (event.animationName === "terrain-wave") band.classList.remove("is-waving");
      });
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var band = entry.target;
        clearTimeout(band.terrainWaveTimer);
        if (!entry.isIntersecting) return;
        var wave = function () {
          if (!desktop.matches) return;
          band.classList.add("is-waving");
          band.terrainWaveTimer = setTimeout(wave, CYCLE);
        };
        band.terrainWaveTimer = setTimeout(wave, FIRST);
      });
    });

    bands.forEach(function (band) {
      observer.observe(band);
    });
  });
})();
