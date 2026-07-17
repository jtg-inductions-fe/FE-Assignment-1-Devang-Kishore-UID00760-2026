import data from '../data/content.json';
import './events';
import { toggle, setOpen, setScrolled } from './navbar';
import { renderCards } from './travelpoint';
import { renderTestimonials } from './carousel';

/**
 * QuerySelectors
 */
const navbar = document.getElementById('navbar-container');
const navbarHamburgerButton = document.getElementById('hamburger');
const navbarLinksMenu = document.getElementById('menu');
const statsContainer = document.getElementById('stats-container');
const testimonialWrapper = document.getElementById('testimonial-wrapper');
const specialDealsContainer = document.getElementById(
    'special-deals-container',
);

/**
 * Constant values
 */
const DESKTOP_BREAK_POINT = 1024;
const Y_SCROLL = 10;
const stats = data['travelPoint'].stats;

/**
 * Function calls
 */
renderCards(stats, statsContainer);
renderTestimonials(testimonialWrapper, data.testimonials);

/**
 * Event Listeners
 */
window.addEventListener('resize', () => {
    setOpen(navbarLinksMenu, navbarHamburgerButton, DESKTOP_BREAK_POINT);
});

window.addEventListener('scroll', () => {
    setScrolled(navbar, Y_SCROLL);
});

window.addEventListener('keydown', (event) => {
    if (
        event.key === 'Escape' &&
        navbarLinksMenu.classList.contains('navbar__content--open')
    ) {
        toggle(navbarHamburgerButton, navbarLinksMenu);
    }

    if (
        event.key === 'Escape' &&
        specialDealsContainer.classList.contains('special-deals--show')
    ) {
        specialDealsContainer.classList.remove('special-deals--show');
    }
});
