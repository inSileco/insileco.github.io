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
  
        });
      });
    }

    // Close menu via bottom chevron button
    const closeWrapper = document.querySelector('.navbar-close-wrapper');
    if (closeWrapper) {
      closeWrapper.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const burger = document.querySelector('.navbar-burger');
        const menu = document.getElementById(burger.dataset.target);
        burger.classList.remove('is-active');
        menu.classList.remove('is-active');
      });
    }

  });