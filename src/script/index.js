import { toggle, setOpen, setScrolled } from './navbar';

/**
 * QuerySelectors for navbar elements
 */
const navbar = document.querySelector('#navbar-container');
const navbarHamburgerButton = document.querySelector('#hamburger');
const navbarLinksMenu = document.querySelector('#menu');
const DESKTOP_BREAK_POINT = 1024;
const Y_SCROLL = 10;

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
