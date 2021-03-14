/**
 * Global constants
 */
const _animContainer = document.querySelector(".animation-container");
const _header = document.querySelector("header");
const _navBar = document.querySelector("#nav-container");
const _sticky = _header.offsetTop;
const _navBurger = document.querySelector(".nav-burger");
const _navList = document.querySelector("#nav-container .nav-ul-contaier ul");
const _navListLinks = document.querySelectorAll(
  "#nav-container .nav-ul-contaier ul li a"
);
const _navListItems = document.querySelectorAll(
  "#nav-container .nav-ul-contaier ul li"
);
const _offerBrands = document.querySelector(".brands");

//remove transition at the end of transition
// !prevents navList hopping on window resize
_navList.addEventListener("transitionend", () => {
  _navList.style.transition = "none";
});

_navListLinks.forEach((link, index) => {
  link.addEventListener("click", () => {
    const isOpen = _navList.classList.contains("nav-slide");
    if (isOpen) _navBurger.click();
  });
});

/**
 * nabBar animation
 */
_navBurger.addEventListener("click", () => {
  //check if slide is open
  const isOpen = _navList.classList.contains("nav-slide");

  //set transition
  _navList.style.transition = "transform 0.3s ease-in-out";

  //toogle slide
  _navList.classList.toggle("nav-slide");

  //set animations for list items
  _navListItems.forEach((item, index) => {
    //restart animation trick
    item.style.animation = "none";
    item.offsetHeight; /* trigger reflow */
    item.style.animation = null;

    if (!isOpen) {
      //as lower index as longer delay
      const delay = index / 6;
      item.style.animation = `nav-list-animation 0.4s 1 forwards ease-out ${delay}s normal`;
    } else {
      item.style.animation = `nav-list-animation 0.4s 1 ease-in 0s reverse`;
    }
  });
});

/**
 * Whellie animation
 */
window.addEventListener(
  "scroll",
  (event) => {
    //scroll correction for sticky navbar
    const scrollPos =
      window.pageYOffset - _header.offsetHeight - _header.offsetTop;

    //position where animation starts
    const animStart =
      _animContainer.offsetTop +
      _animContainer.scrollHeight * 0.5 - //start anim in half scrollHeight
      window.innerHeight -
      _header.offsetHeight;

    //position where animation stops
    const animStop = _animContainer.offsetTop + _animContainer.scrollHeight;

    //default before start
    let scroll = 0;

    if (scrollPos >= animStart && scrollPos <= animStop) {
      //between start and stop position, produce scroll in range 0 - 1
      scroll = (scrollPos - animStart) / (animStop - animStart);
    } else if (scrollPos > animStop) {
      //after end position
      scroll = 1;
    }

    //set scroll to CSS, range 0 - 1
    document.body.style.setProperty("--scroll", scroll);
  },
  false
);

/**
 * Stick navBar
 */
window.addEventListener("scroll", () => {
  // Add the sticky class to the navBar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  if (window.pageYOffset >= _sticky) {
    _header.classList.add("header-sticky");
  } else {
    _header.classList.remove("header-sticky");
  }
});

/**
 * Rendering brand cards
 *
 * @param {Element} container
 */
(function renderBrandCards(container) {
  container.innerHTML = "";

  const fileList = [
    "Aprilia",
    "BMW",
    "Ducati",
    "Harley-Davidson",
    "Honda",
    "Indian",
    "Kawasaki",
    "KTM",
    "MV Agusta",
    "Suzuki",
    "Yamaha",
  ];

  fileList.forEach((name) => {
    const html = `          
      <div class="brand-card">
        <div class="brand-card-img-container">
          <img class="brand-card-img" src="img/brands/${name}.png" />
        </div>
        <div class="brand-card-text-container">
          <p class="brand-card-text">${name}</p>
        </div>
      </div>
      `;
    container.innerHTML += html;
  });
})(_offerBrands);
