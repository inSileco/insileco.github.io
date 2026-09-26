// Home testimonials (PAGE-01): slides of two testimonials, progress steps and
// previous / next buttons. Auto-play every 16 s, paused on hover and focus.
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-carousel]').forEach(function (carousel) {
        const slides = carousel.querySelectorAll('[data-slide]');
        const steps = carousel.querySelectorAll('[data-goto]');
        if (slides.length <= 1) return;

        const slideInterval = 16000;
        let current = 0;
        let autoPlay;

        function show(index) {
            current = (index + slides.length) % slides.length;
            slides.forEach(function (slide, i) { slide.classList.toggle('is-active', i === current); });
            steps.forEach(function (step, i) {
                step.classList.toggle('is-active', i === current);
                step.setAttribute('aria-current', i === current ? 'true' : 'false');
            });
        }

        function start() { stop(); autoPlay = setInterval(function () { show(current + 1); }, slideInterval); }
        function stop() { clearInterval(autoPlay); }

        steps.forEach(function (step) {
            step.addEventListener('click', function () { show(Number(step.dataset.goto)); start(); });
        });
        const prev = carousel.querySelector('[data-prev]');
        const next = carousel.querySelector('[data-next]');
        if (prev) prev.addEventListener('click', function () { show(current - 1); start(); });
        if (next) next.addEventListener('click', function () { show(current + 1); start(); });

        carousel.addEventListener('mouseenter', stop);
        carousel.addEventListener('mouseleave', start);
        carousel.addEventListener('focusin', stop);
        carousel.addEventListener('focusout', start);

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) start();
    });
});
