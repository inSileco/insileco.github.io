/**
 * 404 "map monitor" boot-up (ANI-03)
 * Flags the page for the CSS boot-up (html.has-nf-boot) when motion is
 * allowed, then makes the coordinates scroll like a terminal readout before
 * they settle on their real value. Without JS the final scene shows as is.
 */
(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  // The bundle runs in <head>: the scene is hidden before the first paint
  document.documentElement.classList.add("has-nf-boot");

  function scramble(el) {
    var target = el.textContent;
    var frames = 16;
    var frame = 0;
    var timer = setInterval(function () {
      frame++;
      // Characters settle from left to right; digits and "?" roll until then
      var settled = Math.floor((target.length * frame) / frames);
      el.textContent = target.replace(/[\d?]/g, function (char, i) {
        return i < settled ? char : String(Math.floor(Math.random() * 10));
      });
      if (frame >= frames) clearInterval(timer);
    }, 50);
  }

  document.addEventListener("DOMContentLoaded", function () {
    var coords = document.querySelector(".nf-coords");
    var value = document.querySelector(".nf-coords-value");
    if (!coords || !value) return;
    // Starts with the readout's fade-in (CSS delay)
    coords.addEventListener("animationstart", function () {
      scramble(value);
    }, { once: true });
  });
})();
