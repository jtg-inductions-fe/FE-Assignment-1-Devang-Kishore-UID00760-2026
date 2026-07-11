/**
 * toggles footer__list--active and footer__heading--active classes.
 * footer__list--active class opens the list of links,
 * footer__heading--active class rotates the icon in footer heading.
 * @param {HTMLElement} targetButton -The target button on which use has clicked.
 * @param {HTMLElement} targetList   -The the list which need to be opened.
 */
const toggleAccordion=(targetButton,targetList)=>{
        targetList.classList.toggle("footer__list--active");
        targetButton.classList.toggle("footer__heading--active");
};

export default toggleAccordion;
