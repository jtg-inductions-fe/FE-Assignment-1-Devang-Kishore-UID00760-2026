import data from '../data/content.json';
import { toggle, setOpen, setScrolled } from './navbar';
import { renderCards } from './travelpoint';
import { toggleAccordion } from './accordion';
import { renderTestimonials } from './carousel';
import {
    fetchData,
    rotateSpinner,
    initialise,
    showAllCoupons,
    copyCode,
} from './spinner';
/**
 * QuerySelectors
 */
const navbar = document.querySelector('#navbar-container');
const navbarHamburgerButton = document.querySelector('#hamburger');
const navbarLinksMenu = document.querySelector('#menu');
const statsContainer = document.querySelector('#stats-container');
const testimonialWrapper = document.querySelector('#testimonial-wrapper');
const footerContainer = document.querySelector('#footer-lists');
const specialDealsButton = document.querySelector('#special-deals-button');
const specialDealsContainer = document.querySelector(
    '#special-deals-container',
);
const close = document.querySelector('#close');
const spinButton = document.getElementById('spin-button');
const viewAllButton = document.getElementById('view-all-button');
const spinnerContainer = document.getElementById('spinner-container');
const offersContainer = document.getElementById('offers-container');
const couponContainer = document.getElementById('coupons-container');
const goBackButton = document.getElementById('go-back-button');
const winContainer = document.getElementById('win-container');

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
footerContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('footer__heading')) {
        const targetList = event.target.nextElementSibling;
        toggleAccordion(event.target, targetList);
    }
});

specialDealsButton.addEventListener('click', async (e) => {
    e.preventDefault();
    specialDealsContainer.classList.add('special-deals--show');
    fetchData();
    initialise();
});

spinButton.addEventListener('click', rotateSpinner);

viewAllButton.addEventListener('click', () => {
    spinnerContainer.classList.add('special-deals__spinner--hide');
    offersContainer.classList.add('special-deals__offers--show');
    showAllCoupons();
});

goBackButton.addEventListener('click', () => {
    spinnerContainer.classList.remove('special-deals__spinner--hide');
    offersContainer.classList.remove('special-deals__offers--show');
});

couponContainer.addEventListener('click', () => {
    copyCode(event);
});

winContainer.addEventListener('click', () => {
    copyCode(event);
});

close.addEventListener('click', () => {
    specialDealsContainer.classList.remove('special-deals--show');
});

window.addEventListener('resize', () => {
    setOpen(navbarLinksMenu, navbarHamburgerButton, DESKTOP_BREAK_POINT);
});

window.addEventListener('scroll', () => {
    setScrolled(navbar, Y_SCROLL);
});

navbarHamburgerButton.addEventListener('click', () => {
    toggle(navbarHamburgerButton, navbarLinksMenu);
});
