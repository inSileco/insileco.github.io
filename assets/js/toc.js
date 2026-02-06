/**
 * Table of Contents Sidebar
 * Generates a sticky sidebar with h1-h3 headers from .blog-content
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
    highlightOnScroll(headers);
  }

  function highlightOnScroll(headers) {
    var tocLinks = document.querySelectorAll(".toc-link");
    if (!tocLinks.length) return;

    function updateActive() {
      var scrollPos = window.scrollY + 100;
      var current = null;

      headers.forEach(function (header) {
        if (header.offsetTop <= scrollPos) {
          current = header;
        }
      });

      tocLinks.forEach(function (link) {
        link.classList.remove("is-active");
        if (current && link.getAttribute("href") === "#" + current.id) {
          link.classList.add("is-active");
        }
      });
    }

    window.addEventListener("scroll", updateActive, { passive: true });
    updateActive();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildTOC);
  } else {
    buildTOC();
  }
})();
