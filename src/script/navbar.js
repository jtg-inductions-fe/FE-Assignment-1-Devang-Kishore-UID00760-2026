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
 * @param {string} breakpoint- Minimum value of desktop screen size.
 */
const setOpen = (navbarLinksMenu, navbarHamburgerButton, breakpoint) => {
    if (
        window.innerWidth >= breakpoint &&
        navbarLinksMenu.classList.contains('navbar__content--open')
    ) {
        navbarLinksMenu.classList.remove('navbar__content--open');
        navbarHamburgerButton.classList.remove('icon--cross');
        navbarHamburgerButton.classList.add('icon--main');
        navbarHamburgerButton.setAttribute('aria-expanded', 'false');
    }
};

/**
 * Adds header--scrolled class to navbar when user scrolls
 * header--scrolled class changes the color of navbar
 * @param {string} navbar- Navbar Element.
 * @param {string} scrollValue- Minimum scroll distance required to set header--scrolled class.
 */
const setScrolled = (navbar, scrollValue) => {
    if (window.scrollY > scrollValue) {
        navbar.classList.add('header--scrolled');
    } else {
        navbar.classList.remove('header--scrolled');
    }
};

/**
 * Traps focus for Navbar when opened
 * @param {Event} e- Tab key down event.
 * @param {HTMLElements} focusableElements- Elements which can be focused using tab.
 * @param {HTMLElement}  navbarHamburgerButton - Hamburger button.
 * @param {number} desktopSize- break point for desktop screen.
 * @param {number} tabletSize- break point for tablet screen.
 */
const trapFocus = (
    e,
    focusableElements,
    navbarHamburgerButton,
    desktopSize,
    tabletSize,
) => {
    const isTabPressed = e.key === 'Tab';
    const firstFocusableEl = navbarHamburgerButton;
    let lastFocusableEl = focusableElements[focusableElements.length - 1];

    if (!isTabPressed || window.innerWidth > desktopSize) {
        return;
    }

    if (window.innerWidth > tabletSize) {
        lastFocusableEl = focusableElements[focusableElements.length - 3];
    }

    if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
            lastFocusableEl.focus();
            e.preventDefault();
        }
    } else {
        if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            e.preventDefault();
        }
    }
};

export { toggle, setOpen, setScrolled, trapFocus };
