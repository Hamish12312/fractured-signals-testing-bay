window.addEventListener("scroll", function () {
    const logo = document.getElementById("cover-page-contents");
    const header = document.getElementById("main-header");
    const arrow = document.getElementById("arrow")

    // Check if the vertical scroll position is greater than 0
    if (window.scrollY > 0) {
        // As soon as we scroll down, add the 'scrolled' class
        logo.classList.add("scrolled");
        header.classList.add("scrolled");
        arrow.classList.add("scrolled");
    } else {
        // If we are back at the very top (scrollY = 0), remove the class
        logo.classList.remove("scrolled");
        header.classList.remove("scrolled");
        arrow.classList.remove("scrolled");
    }
});