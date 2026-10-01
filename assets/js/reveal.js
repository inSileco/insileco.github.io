/**
 * Scroll reveals (ANI-02)
 * Elements with .reveal fade in and rise once, when they enter the viewport.
 * Elements entering together appear one after the other (--reveal-order,
 * capped so long lists do not wait). The slow reveal transition is dropped
 * once done (.is-revealing), so cards get their hover transitions back.
 * Without IntersectionObserver or with reduced motion, nothing is hidden.
 */
(function () {
  "use strict";

  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var MAX_ORDER = 4;

  // The bundle runs in <head>: hiding starts before the first paint
  document.documentElement.classList.add("has-reveal");

  function done(event) {
    if (event.target !== this || event.propertyName !== "opacity") return;
    this.classList.remove("is-revealing");
    this.style.removeProperty("--reveal-order");
    this.removeEventListener("transitionend", done);
  }

  var observer = new IntersectionObserver(
    function (entries) {
      var order = 0;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        el.style.setProperty("--reveal-order", Math.min(order++, MAX_ORDER));
        el.addEventListener("transitionend", done);
        el.classList.add("is-revealing", "is-revealed");
        observer.unobserve(el);
      });
    },
    { rootMargin: "0px 0px -10% 0px" }
  );

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".reveal").forEach(function (el) {
      observer.observe(el);
    });
  });
})();
