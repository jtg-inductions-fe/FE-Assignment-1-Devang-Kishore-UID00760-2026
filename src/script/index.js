import data from '../data/content.json';
import { toggle, setOpen, setScrolled } from './navbar';
import renderCards from './travelpoint';
import toggleAccordion from './accordion';
import renderTestimonials from './carousel';

/**
 * QuerySelectors for navbar elements
 */
const navbar = document.querySelector('#navbar-container');
const navbarHamburgerButton = document.querySelector('#hamburger');
const navbarLinksMenu = document.querySelector('#menu');
const statsContainer = document.querySelector('.travel-point__stats');
const DESKTOP_BREAK_POINT = 1024;
const Y_SCROLL = 10;
const stats = data['travel-point'].stats;
const footerContainer = document.querySelector('#footer-lists');

/**
 * Function calls
 */
renderCards(stats, statsContainer);
renderTestimonials(data.testimonials);

/**
 * Event Listeners
 */
footerContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('footer__heading')) {
        const targetList=event.target.nextElementSibling;
        toggleAccordion(event.target,targetList);
    }
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
