const desktopBreakPoint = 1025;

/**
 * Toggle mobile navigation
 */
const toggle = (navbarToggle, navbarContent) => {
    if (!navbarToggle || !navbarContent) return;
    navbarToggle.addEventListener('click', () => {
        const isOpen = navbarContent.classList.toggle('navbar__content--open');
        navbarToggle.classList.toggle('navbar__toggle--active');
        navbarToggle.setAttribute('aria-expanded', isOpen);
    });
};

const events = (navbarContent, navbarToggle, navbar) => {
    /**
     * Content--open class remove on resize
     */
    window.addEventListener('resize', () => {
        if (
            window.innerWidth >= desktopBreakPoint &&
            navbarContent.classList.contains('navbar__content--open')
        ) {
            navbarContent.classList.remove('navbar__content--open');
            navbarToggle.classList.remove('navbar__toggle--active');
            navbarToggle.setAttribute('aria-expanded', 'false');
        }
    });

    /**
     * Add header--scrolled
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
