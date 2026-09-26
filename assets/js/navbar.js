document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
  
      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
          el.setAttribute('aria-expanded', el.classList.contains('is-active'));

        });
      });
    }

    // Dropdown entries without a page (span.navbar-link) are focusable so the
    // keyboard can open them; a mouse click must not give them focus, otherwise
    // the dropdown stays open (:focus-within) after the pointer leaves.
    document.querySelectorAll('span.navbar-link').forEach(el => {
      el.addEventListener('mousedown', (e) => e.preventDefault());
    });

    // Close menu via bottom chevron button
    const closeWrapper = document.querySelector('.navbar-close-wrapper');
    if (closeWrapper) {
      closeWrapper.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const burger = document.querySelector('.navbar-burger');
        const menu = document.getElementById(burger.dataset.target);
        burger.classList.remove('is-active');
        burger.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-active');
      });
    }

  });