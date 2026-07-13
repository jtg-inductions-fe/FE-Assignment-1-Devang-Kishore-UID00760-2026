import data from '../data/content.json';
import { toggle, setOpen, setScrolled } from './navbar';
import { renderCards } from './travelpoint';
import renderTestimonials from './carousel';
/**
 * QuerySelectors for navbar elements
 */
const navbar = document.querySelector('#navbar-container');
const navbarHamburgerButton = document.querySelector('#hamburger');
const navbarLinksMenu = document.querySelector('#menu');
const statsContainer = document.querySelector('#stats-container');
const DESKTOP_BREAK_POINT = 1024;
const Y_SCROLL = 10;
const stats = data['travelPoint'].stats;

/**
 * Function calls
 */
renderCards(stats, statsContainer);
renderTestimonials(data.testimonials);
/**
 * Event Listeners
 */
window.addEventListener('resize', () => {
    setOpen(navbarLinksMenu, navbarHamburgerButton, DESKTOP_BREAK_POINT);
});

window.addEventListener('scroll', () => {
    setScrolled(navbar, Y_SCROLL);
});

navbarHamburgerButton.addEventListener('click', () => {
    toggle(navbarHamburgerButton, navbarLinksMenu);
});
