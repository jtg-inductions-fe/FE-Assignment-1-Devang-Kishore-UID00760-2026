/**
 * Toggles classes when user click on hamburger button.
 * @param {string} navbarHamburgerButton - Navbar Hamburger Button.
 * @param {string} navbarLinksMenu - Navbar Links Menu Element.
 */
const toggle = (navbarHamburgerButton, navbarLinksMenu) => {
    if (!navbarHamburgerButton || !navbarLinksMenu) return;
    const isOpen = navbarLinksMenu.classList.toggle('navbar__content--open');
    navbarHamburgerButton.classList.toggle('icon--main');
    navbarHamburgerButton.classList.toggle('icon--cross');
    navbarHamburgerButton.setAttribute('aria-expanded', isOpen);
};

/**
 * Removes content--open class on resize
 * content--open class opens the menu of links
 * @param {string} navbarHamburgerButton - Navbar Hamburger Button.
 * @param {string} navbarLinksMenu - Navbar Links Menu Element.
 * @param {string} DESKTOP_BREAK_POINT- Minimum value of desktop screen size.
 */
const setOpen = (
    navbarLinksMenu,
    navbarHamburgerButton,
    DESKTOP_BREAK_POINT,
) => {
    if (
        window.innerWidth >= DESKTOP_BREAK_POINT &&
        navbarLinksMenu.classList.contains('navbar__content--open')
    ) {
        navbarLinksMenu.classList.remove('navbar__content--open');
        navbarHamburgerButton.classList.remove('button--sm--active');
        navbarHamburgerButton.setAttribute('aria-expanded', 'false');
    }
};

/**
 * Adds header--scrolled class to navbar when user scrolls
 * header--scrolled class changes the color of navbar
 * @param {string} navbar- Navbar Element.
 * @param {string} Y_SCROLL- Minimum scroll distance required to set header--scrolled class.
 */
const setScrolled = (navbar, Y_SCROLL) => {
    if (window.scrollY > Y_SCROLL) {
        navbar.classList.add('header--scrolled');
    } else {
        navbar.classList.remove('header--scrolled');
    }
};

export { toggle, setOpen, setScrolled };
