import { toggle, events } from './navbar';

const navbar = document.querySelector('.header');
const navbarToggle = document.querySelector('.button--sm');
const navbarContent = document.querySelector('.navbar__content');

toggle(navbarToggle, navbarContent);
events(navbarContent, navbarToggle, navbar);
