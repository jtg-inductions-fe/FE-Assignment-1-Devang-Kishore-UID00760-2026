/**
 * Generates rating stars.
 * @param {number} rating - Rating given by user.
 * @returns {Array} -Array of span elements representing the rating stars.
 */
const createRating = (rating) =>
    Array.from({ length: rating }, () => {
        const ratingStar = document.createElement('span');
        ratingStar.className = 'testimonial__star';
        return ratingStar;
    });

/**
 * Generates testimonial slide.
 * @param {Object} testimonial
 * @returns {HTMLDivElement}
 */
const createTestimonial = ({ name, designation, image, rating, review }) => {
    const IMAGE_SIZE = 128;
    const testimonialContainer = document.createElement('div');
    const testimonialImage = document.createElement('img');
    const testimonialContent = document.createElement('div');
    const userName = document.createElement('h3');
    const userDesignation = document.createElement('span');
    const testimonialRating = document.createElement('div');
    const testimonialReview = document.createElement('p');
    testimonialContainer.className = 'swiper-slide testimonial';
    testimonialImage.className = 'testimonial__image';
    testimonialImage.src = image;
    testimonialImage.alt = name;
    testimonialImage.width = IMAGE_SIZE;
    testimonialImage.height = IMAGE_SIZE;
    testimonialContent.className = 'testimonial__content';
    userName.innerText = name;
    userName.className = 'testimonial__name';
    userDesignation.innerText = ` / ${designation}`;
    userDesignation.className = 'testimonial__designation';
    userName.appendChild(userDesignation);
    testimonialRating.className = 'testimonial__rating';
    testimonialRating.ariaLabel = `${rating} out of 5 stars`;
    testimonialRating.append(...createRating(rating));
    testimonialReview.classList = 'body1 testimonial__review';
    testimonialReview.innerText = review;
    testimonialContent.append(userName, testimonialRating, testimonialReview);
    testimonialContainer.append(testimonialImage, testimonialContent);
    return testimonialContainer;
};

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
        },
    });
};

/**
 * Render testimonials.
 * @param {Array} testimonials
 */
const renderTestimonials = (testimonialWrapper, testimonials) => {
    testimonials.forEach((testimonial) => {
        testimonialWrapper.appendChild(createTestimonial(testimonial));
    });

    initialiseSwiper();
};

export { renderTestimonials };
