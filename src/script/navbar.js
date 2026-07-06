const navbarToggle = document.querySelector(".navbar__toggle");
const navbarContent = document.querySelector(".navbar__content");
const navbarList = document.querySelector(".navbar__list");
const logo = document.querySelector(".navbar__logo");
const navbarActions = document.querySelector(".navbar__actions");
const desktopBreakPoint=1025;
/**
 * Fetch navigation data 
 */
const fetchNavData = async () => {
    try {
        const response = await fetch("./data/content.json");
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const { header } = await response.json();
        renderLogo(header.logo);
        renderLinks(header.links);
        renderActions(header.login, header.signup);
    } catch (error) {
        console.error("Failed to load navbar data:", error);
    }
};

/**
 * Render logo
 */
const renderLogo = ({ image, alt }) => {
    logo.innerHTML = `<img src="${image}" alt="${alt}">`;
};

/**
 * Render navigation links
 */
const renderLinks = (links) => {
    navbarList.innerHTML = links.map(({ href, content, isActive }) => `
                <li class="navbar__item">
                    <a href="${href}" class="navbar__link ${isActive ? "navbar__link--active" : ""}" ${isActive ? 'aria-current="page"' : ""}>
                        ${content}
                    </a>
                </li>`).join("");
};

/**
 * Render login/signup button
 */
const renderActions = (login, signup) => {
    navbarActions.innerHTML = `
        <a href="${login.href}" class="navbar__login">
            ${login.content}
        </a>
        <a href="${signup.href}" class="navbar__signup">
            ${signup.content}
        </a>
    `;
};

/**
 * Toggle mobile navigation
 */
const toggle = () => {
    if (!navbarToggle || !navbarContent) return;
    navbarToggle.addEventListener("click", () => {
        const isOpen = navbarContent.classList.toggle("navbar__content--open");
        navbarToggle.classList.toggle("navbar__toggle--active");
        navbarToggle.setAttribute("aria-expanded", isOpen);
    });
};

/**
 * Content--open class remove  
 */
window.addEventListener("resize",()=>{
    if(window.innerWidth>=desktopBreakPoint && navbarContent.classList.contains("navbar__content--open")){
        navbarContent.classList.remove("navbar__content--open");
        navbarToggle.classList.remove("navbar__toggle--active");
        navbarToggle.setAttribute("aria-expanded","false");
    }
})
export { fetchNavData, toggle };
