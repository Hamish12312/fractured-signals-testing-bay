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

// ===== GALLERY LIGHTBOX =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");

if (lightbox) {
    const galleryImages = document.querySelectorAll(".gallery-grid img");

    galleryImages.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.classList.add("active");
            lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.classList.remove("active");
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove("active");
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            lightbox.classList.remove("active");
        }
    });
}
