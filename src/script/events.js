import { toggle, trapFocus } from './navbar';
import { toggleAccordion } from './accordion';
import {
    fetchData,
    rotateSpinner,
    initialiseSpinner,
    showAllCoupons,
    copyCode,
} from './spinner';

/**
 * QuerySelectors
 */
const navbarHamburgerButton = document.getElementById('hamburger');
const navbarLinksMenu = document.getElementById('menu');
const footerContainer = document.getElementById('footer-lists');
const specialDealsButton = document.getElementById('special-deals-button');
const specialDealsContainer = document.getElementById(
    'special-deals-container',
);
const close = document.getElementById('close');
const spinButton = document.getElementById('spin-button');
const viewAllButton = document.getElementById('view-all-button');
const spinnerContainer = document.getElementById('spinner-container');
const offersContainer = document.getElementById('offers-container');
const couponContainer = document.getElementById('coupons-container');
const goBackButton = document.getElementById('go-back-button');
const winContainer = document.getElementById('win-container');
const focusableElements = navbarLinksMenu.querySelectorAll('a');
const DESKTOP_BREAK_POINT = 1024;
const TABLET_BREAK_POINT = 768;

/**
 * Event Listeners
 */
navbarHamburgerButton.addEventListener('click', () => {
    toggle(navbarHamburgerButton, navbarLinksMenu);
});

navbarLinksMenu.addEventListener('keydown', (e) =>
    trapFocus(
        e,
        focusableElements,
        navbarHamburgerButton,
        DESKTOP_BREAK_POINT,
        TABLET_BREAK_POINT,
    ),
);

footerContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains('footer__heading')) {
        const targetList = event.target.nextElementSibling;
        toggleAccordion(event.target, targetList);
    }
});

specialDealsButton.addEventListener('click', async (e) => {
    e.preventDefault();
    specialDealsContainer.showModal();
    specialDealsContainer.classList.add('special-deals--show');
    await fetchData();
    initialiseSpinner();
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
    specialDealsContainer.close();
    specialDealsContainer.classList.remove('special-deals--show');
});
