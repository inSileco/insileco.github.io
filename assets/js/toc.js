/**
 * Table of Contents Sidebar
 * Generates a sticky sidebar with h1-h3 headers from .blog-content
 * Reading progress (ANI-08): --toc-progress (0 → 1) on the list fills the bar
 * along it; sections already read get .is-read, the current one .is-active.
 */
(function () {
  "use strict";

  function buildTOC() {
    var content = document.querySelector(".blog-content");
    var tocContainer = document.getElementById("toc-sidebar");
    if (!content || !tocContainer) return;

    var headers = content.querySelectorAll("h1, h2, h3");
    if (headers.length < 2) {
      tocContainer.style.display = "none";
      return;
    }

    var tocList = document.createElement("ul");
    tocList.className = "toc-list";

    headers.forEach(function (header, index) {
      if (!header.id) {
        header.id = "toc-heading-" + index;
      }

      var li = document.createElement("li");
      li.className = "toc-item toc-" + header.tagName.toLowerCase();

      var link = document.createElement("a");
      link.href = "#" + header.id;
      link.textContent = header.textContent;
      link.className = "toc-link";

      li.appendChild(link);
      tocList.appendChild(li);
    });

    tocContainer.appendChild(tocList);
    highlightOnScroll(headers, content, tocList);
  }

  // 0 when the top of the article reaches the navbar, 1 when its end reaches
  // the bottom of the screen
  function readingProgress(content) {
    var navbar = document.querySelector(".navbar");
    var top = navbar ? navbar.offsetHeight : 0;
    var rect = content.getBoundingClientRect();
    var distance = rect.height - (window.innerHeight - top);
    if (distance <= 0) return 1;
    return Math.min(1, Math.max(0, (top - rect.top) / distance));
  }

  function highlightOnScroll(headers, content, tocList) {
    var tocLinks = document.querySelectorAll(".toc-link");
    if (!tocLinks.length) return;
    var ticking = false;

    function updateActive() {
      ticking = false;
      var scrollPos = window.scrollY + 100;
      var progress = readingProgress(content);
      var currentIndex = -1;

      headers.forEach(function (header, index) {
        if (header.offsetTop <= scrollPos) {
          currentIndex = index;
        }
      });

      // At the very end of the article, the last section is read too
      var readUntil = progress >= 1 ? headers.length : currentIndex;

      tocLinks.forEach(function (link, index) {
        link.classList.toggle("is-active", index === currentIndex && progress < 1);
        link.classList.toggle("is-read", index < readUntil);
      });

      tocList.style.setProperty("--toc-progress", progress.toFixed(4));
    }

    // One update per frame at most
    function onScroll() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActive);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateActive();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildTOC);
  } else {
    buildTOC();
  }
})();
