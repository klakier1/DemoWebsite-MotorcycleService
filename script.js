/**
 * Global constants
 */
const _animContainer = document.querySelector(".animation-container");
const _navBar = document.querySelector("#nav-container");
const _sticky = _navBar.offsetTop;
const _navBurger = document.querySelector(".nav-burger");
const _navList = document.querySelector("#nav-container ul");
const _navListItems = document.querySelectorAll("#nav-container ul li");

/**
 * nabBar animation
 */
_navBurger.addEventListener("click", () => {
  //check if slide is open
  const isOpen = _navList.classList.contains("nav-slide");

  //toogle slide
  _navList.classList.toggle("nav-slide");

  //animate list items
  _navListItems.forEach((item, index) => {
    //restart animation trick
    item.style.animation = "none";
    item.offsetHeight; /* trigger reflow */
    item.style.animation = null;

    !isOpen
      ? (item.style.animation = `nav-list-animation 0.3s 1 ease-out ${
          index / 6
        }s normal`)
      : (item.style.animation = `nav-list-animation 0.3s 1 ease-in reverse`);
  });
});

/**
 * Whellie animation
 */
window.addEventListener(
  "scroll",
  (event) => {
    //scroll correction for sticky navbar
    const scrollPos = window.pageYOffset + _navBar.scrollHeight;

    //position where animation starts
    const animStart =
      _animContainer.offsetTop +
      _animContainer.scrollHeight -
      window.innerHeight +
      _navBar.scrollHeight;

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
    _navBar.classList.add("nav-container-sticky");
  } else {
    _navBar.classList.remove("nav-container-sticky");
  }
});
