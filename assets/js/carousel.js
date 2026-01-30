document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.testimonial-dot');

    if (slides.length <= 1) return;

    let currentSlide = 0;
    const slideInterval = 8000; // 8 seconds
    let autoPlayInterval;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('is-active'));
        dots.forEach(dot => dot.classList.remove('is-active'));

        slides[index].classList.add('is-active');
        dots[index].classList.add('is-active');
        currentSlide = index;
    }

    function nextSlide() {
        const next = (currentSlide + 1) % slides.length;
        showSlide(next);
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, slideInterval);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Dot click handlers
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });

    // Start auto-play
    startAutoPlay();

    // Pause on hover
    const carousel = document.querySelector('.testimonials-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
});