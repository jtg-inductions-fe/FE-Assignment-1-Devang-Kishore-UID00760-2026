import { toggle, events } from './navbar';

/**
* QuerySelectors for navbar elements
*/
const navbar = document.querySelector('.header');
const navbarHamburgerButton = document.querySelector('.button--sm');
const navbarLinksMenu = document.querySelector('.navbar__content');

/**
* function calls for navbar events 
*/
toggle(navbarHamburgerButton, navbarLinksMenu);
events(navbarLinksMenu, navbarHamburgerButton, navbar);
