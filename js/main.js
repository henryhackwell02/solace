/*
    ========================================
    SOLACE - Main JavaScript File
    ========================================
    This file handles all the animations on the page.

    It does three main things:
    1. Fades in the hero content when the page loads
    2. Fades in elements as you scroll down the page

    We use the "Intersection Observer" API which is a modern,
    efficient way to detect when elements come into view.
*/


// ========================================
// PART 1: HERO FADE-IN ON PAGE LOAD
// ========================================
// When the page finishes loading, fade in the hero content
// with a small delay between each element.

document.addEventListener('DOMContentLoaded', function() {
    /*
        'DOMContentLoaded' fires when the HTML is fully loaded.
        This is when we start our animations.
    */

    // Find all elements in the hero section with the 'fade-in' class
    const heroElements = document.querySelectorAll('.hero .fade-in');

    // Loop through each element and add the 'visible' class
    // with increasing delays (0ms, 200ms, 400ms, etc.)
    heroElements.forEach(function(element, index) {
        // setTimeout delays the action by the specified milliseconds
        // Each element gets an extra 200ms delay
        setTimeout(function() {
            element.classList.add('visible');
        }, index * 200); // 0, 200, 400, 600...
    });
});


// ========================================
// PART 2: SCROLL-TRIGGERED ANIMATIONS
// ========================================
// These animations happen when you scroll down and
// elements come into view.

/*
    The Intersection Observer watches elements and tells us
    when they enter or leave the viewport (visible area).

    Options:
    - root: null means we're watching relative to the viewport
    - rootMargin: '0px' means no extra margin around the viewport
    - threshold: 0.1 means trigger when 10% of the element is visible
*/
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Trigger when 10% of element is visible
};

/*
    This function runs every time an observed element
    enters or leaves the viewport.
*/
function handleIntersection(entries, observer) {
    // 'entries' is an array of all elements being observed
    entries.forEach(function(entry) {
        // 'isIntersecting' is true when the element is visible
        if (entry.isIntersecting) {
            const element = entry.target;

            // Check if this element has a delay (for genre boxes)
            const delay = element.getAttribute('data-delay');

            if (delay !== null) {
                /*
                    If the element has a data-delay attribute,
                    wait before adding the 'visible' class.
                    This creates the sequential fade-in effect
                    for the genre boxes (one by one as you scroll).
                */
                const delayTime = parseInt(delay) * 300; // 300ms between each box
                setTimeout(function() {
                    element.classList.add('visible');
                }, delayTime);
            } else {
                // No delay - add visible class immediately
                element.classList.add('visible');
            }

            /*
                Stop observing this element after it's visible.
                This prevents the animation from replaying if
                you scroll up and down repeatedly.
            */
            observer.unobserve(element);
        }
    });
}

// Create the observer with our options and callback function
const scrollObserver = new IntersectionObserver(handleIntersection, observerOptions);

// Find all elements with the 'scroll-fade' class and observe them
document.addEventListener('DOMContentLoaded', function() {
    const scrollElements = document.querySelectorAll('.scroll-fade');

    scrollElements.forEach(function(element) {
        // Tell the observer to watch this element
        scrollObserver.observe(element);
    });
});


// ========================================
// PART 4: SMOOTH SCROLLING FOR NAV LINKS
// ========================================
// When you click a navigation link, smoothly scroll
// to that section instead of jumping instantly.

document.addEventListener('DOMContentLoaded', function() {
    // Find all links that start with '#' (internal links)
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // Prevent the default jump behavior
            event.preventDefault();

            // Get the target section ID from the link's href
            const targetId = this.getAttribute('href');

            // Find the target section
            const targetSection = document.querySelector(targetId);

            // If the section exists, scroll to it smoothly
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth', // Smooth animation
                    block: 'start' // Align to top of viewport
                });
            }
        });
    });
});
