
const navbarToggle = document.querySelector(".navbar__toggle");
const navbarContent = document.querySelector(".navbar__content");
const navbarLinks = document.querySelectorAll(".navbar__link");
const navbarList=document.querySelector(".navbar__list");
const logo=document.querySelector(".navbar__logo");
const navbarActions=document.querySelector(".navbar__actions");
const fetchNavData=async()=>{
    let response=await fetch("./data/content.json");
    let data= await response.json();
    let linkData=""
    for(let i of data.header.links){
        if(i.isActive){
            linkData=linkData+`<li class="navbar__item"> <a href="${i.href}" class="navbar__link navbar__link--active ",  >${i.content} </a> </li>`;
        }else{
            linkData=linkData+`<li class="navbar__item"> <a href="${i.href}" class="navbar__link",  >${i.content} </a> </li>`;
        }
    }
    navbarList.innerHTML=linkData;
    logo.innerHTML=`<img src="${data.header.logo.image}" alt="${data.header.logo.alt}">`;
    const loginContent=`<a href="${data.header.login.href}" class="navbar__login">${data.header.login.content}</a>`;
    const signupContent=`<a href="${data.header.signup.href}" class="navbar__signup">${data.header.signup.content}</a>`;

    navbarActions.innerHTML=loginContent+signupContent;
}

const toggle=()=>{
        navbarToggle.addEventListener("click", () => {
        navbarContent.classList.toggle("navbar__content--open");
        navbarToggle.classList.toggle("navbar__toggle--active");
    });
}


export {toggle,fetchNavData};
