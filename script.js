// ===== Fade In on Load =====
window.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("fade-in");
});

// ===== Handle Back/Forward Cache =====
window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        document.body.classList.remove("fade-out");
        document.body.classList.add("fade-in");
    }
});

// ===== Fade Out on Enter Button Click =====
document.querySelectorAll(".enter-link").forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();
        const destination = this.getAttribute("href");

        document.body.classList.remove("fade-in");
        document.body.classList.add("fade-out");

        setTimeout(() => {
            window.location.href = destination;
        }, 600);
    });
});

// ===== Nav Scroll Effect =====
const nav = document.querySelector(".nav");

if (nav) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    });
}