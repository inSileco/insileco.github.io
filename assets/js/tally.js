/**
 * Tally embeds (CR-07): Contact form and footer newsletter.
 * Each <iframe data-tally-src> is loaded by Tally's script when it gets close
 * to the screen, so the footer newsletter does not load Tally on every page
 * view. Some parameters of the page URL are passed on to the form (?need= from
 * the "Contact us" buttons: used once inSileco adds a hidden field "need").
 * If Tally's script cannot load, the iframe gets its address directly.
 */
(function () {
  "use strict";

  var SCRIPT = "https://tally.so/widgets/embed.js";
  var FORWARDED = ["need"];
  var loading = null;

  function loadScript() {
    if (loading) return loading;
    loading = new Promise(function (resolve, reject) {
      if (typeof Tally !== "undefined") return resolve();
      var script = document.createElement("script");
      script.src = SCRIPT;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
    return loading;
  }

  function forwardParams(iframe) {
    var page = new URLSearchParams(window.location.search);
    var url = new URL(iframe.dataset.tallySrc);
    FORWARDED.forEach(function (name) {
      if (page.has(name)) url.searchParams.set(name, page.get(name));
    });
    iframe.dataset.tallySrc = url.toString();
  }

  function load(iframe) {
    loadScript()
      .then(function () {
        Tally.loadEmbeds();
      })
      .catch(function () {
        iframe.src = iframe.dataset.tallySrc;
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var iframes = document.querySelectorAll("iframe[data-tally-src]");
    if (!iframes.length) return;

    iframes.forEach(forwardParams);

    if (!("IntersectionObserver" in window)) {
      iframes.forEach(load);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          load(entry.target);
        });
      },
      { rootMargin: "600px 0px" }
    );

    iframes.forEach(function (iframe) {
      observer.observe(iframe);
    });
  });
})();
