import data from '../data/content.json';
import { toggle, events } from './navbar';
import { renderCards } from './travelpoint';
/**
 * querySelectors for accessing different elements
 */
const navbar = document.querySelector('.header');
const navbarToggle = document.querySelector('.button--sm');
const navbarContent = document.querySelector('.navbar__content');
const statsContainer = document.querySelector('.travel-point__stats');

const stats = data['travel-point'].stats;
renderCards(stats, statsContainer);
toggle(navbarToggle, navbarContent);
events(navbarContent, navbarToggle, navbar);
