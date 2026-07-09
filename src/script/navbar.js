const desktopBreakPoint = 1025;

/**
 * Toggles classes when user click on hamburger button.
 * @param {string} navbarHamburgerButton - Navbar Hamburger Button.
 * @param {string} navbarLinksMenu - Navbar Links Menu Element.
 */
const toggle = (navbarHamburgerButton, navbarLinksMenu) => {
    if (!navbarHamburgerButton || !navbarLinksMenu) return;
    navbarHamburgerButton.addEventListener('click', () => {
        const isOpen = navbarLinksMenu.classList.toggle('navbar__content--open');
        navbarHamburgerButton.classList.toggle('button--sm--active');
        navbarHamburgerButton.setAttribute('aria-expanded', isOpen);
    });
};

/**
 * Handles events(scroll,resize) for changing the states of navbar.
 * @param {string} navbarHamburgerButton - Navbar Hamburger Button.
 * @param {string} navbarLinksMenu - Navbar Links Menu Element.
 * @param {string} navbar- Navbar Element.
 */
const events = (navbarLinksMenu, navbarHamburgerButton, navbar) => {
    /**
     * Content--open class remove on resize
     */
    window.addEventListener('resize', () => {
        if (
            window.innerWidth >= desktopBreakPoint &&
            navbarLinksMenu.classList.contains('navbar__content--open')
        ) {
            navbarLinksMenu.classList.remove('navbar__content--open');
            navbarHamburgerButton.classList.remove('button--sm--active');
            navbarHamburgerButton.setAttribute('aria-expanded', 'false');
        }
    });

    /**
     * Adds header--scrolled class to navbar when use scrolls 
     */
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            navbar.classList.add('header--scrolled');
        } else {
            navbar.classList.remove('header--scrolled');
        }
    });
};

export { toggle, events };
