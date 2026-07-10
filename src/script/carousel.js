const testimonialWrapper = document.querySelector('#testimonial-wrapper');

/**
 * Generates rating stars.
 * @param {number} rating
 * @returns {string}
 */
const createRating = (rating) =>Array.from({ length: rating },
        () => '<span class="testimonial__star"></span>',
    ).join('');

/**
 * Generates testimonial slide.
 * @param {Object} testimonial
 * @returns {string}
 */
const createTestimonial = ({ name, designation, image, rating, review }) => `
    <div class="swiper-slide testimonial">
        <img
            class="testimonial__image"
            src="${image}"
            alt="${name}"
            width="128"
            height="128"
        >
        <div class="testimonial__content">
            <h3 class="testimonial__name">
                ${name}
                <span class="testimonial__designation">
                    / ${designation}
                </span>
            </h3>
            <div
                class="testimonial__rating"
                aria-label="${rating} out of 5 stars">
                ${createRating(rating)}
            </div>
            <p class="description testimonial__review">
                ${review}
            </p>
        </div>
    </div>
`;

/**
 * Initialise Swiper.
 */
const initialiseSwiper = () => {
    new Swiper('.testimonial-swiper', {
        loop: true,
        speed: 600,
        slidesPerView: 1,
        centeredSlides: true,
        spaceBetween: 24,
        grabCursor: true,

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        keyboard: {
            enabled: true,
            onlyInViewport: false,
        }
    });
};

/**
 * Render testimonials.
 * @param {Array} testimonials
 */
const renderTestimonials = (testimonials) => {
    testimonialWrapper.innerHTML = testimonials.map(createTestimonial).join('');
    initialiseSwiper();
};

export default renderTestimonials;
