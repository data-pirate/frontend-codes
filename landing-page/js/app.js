/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

// select the navigation menu to work with
const navigationBar = document.getElementById('navbar__list');

// sections of the page
const sections = document.querySelectorAll('section');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const checkViewPort = function (section) {
    const position = section.getBoundingClientRect();
    return (position.top < 150 && position.bottom >= -150);
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNavBar = function () {
    sections.forEach(function (section) {

        // extracting id and data-nav attribute from each section
        const sectionId = section.id;
        const sectionDataNav = section.dataset.nav;

        let liElement = document.createElement('li');
        liElement.className = 'menu__link';
        liElement.dataset.nav = sectionId;
        liElement.innerHTML = sectionDataNav;

        // appending the li element to the navigation menu with a tag in it
        navigationBar.appendChild(liElement);
    });
};


// Add class 'active' to section when near top of viewport

const changeState = function () {
    sections.forEach(function (section) {
        // removing all the yout-active-classes
        section.classList.remove('your-active-class');
        section.style.cssText = 'opacity: 0.2;';

        // checking if the section is in the viewport
        // if true will add the your-active-class
        // else it will continue
        if (checkViewPort(section)) {
            section.classList.add('your-active-class');
            section.style.cssText = 'opacity: 1; ';

            // list of all <li> elements in the document
            const liElements = document.querySelector('li[data-nav="' + section.id + '"]');

            // adding active class to all the <li> Elements
            liElements.classList.add('active');
    
            // all menu links to sync them with the section
            const menuLinks = document.querySelectorAll('.menu__link');
            menuLinks.forEach(
                function (link) {
                    // if data-nav of the <a> element not equal to <li> element and it contains `active` class
                    // then remove it
                    if (link.dataset.nav != liElements.dataset.nav & liElements.classList.contains('active')) {
                        link.classList.remove('active');
                    }
                });
        }
    });
};

// Scroll to anchor ID using scrollTO event

const scrollTo = function () {
    navigationBar.addEventListener('click', function (event) {
        let clickId = document.getElementById(event.dataset.nav)
        clickId.scrollIntoView({ behavior: "smooth" });
    });
};


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNavBar();

// Scroll to section on link click
scrollTo();

// Set sections as active
window.addEventListener('scroll', changeState);
