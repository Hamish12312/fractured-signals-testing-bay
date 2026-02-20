const PAGE_FADE_MS = 600;

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

// ===== Fade Out for Internal Page Links =====
document.querySelectorAll(".enter-link").forEach((link) => {
    link.addEventListener("click", (e) => {
        const destination = link.getAttribute("href");
        if (!destination) {
            return;
        }

        const isHashLink = destination.startsWith("#");
        const isExternal = link.origin !== window.location.origin;
        const opensNewTab = link.target === "_blank";
        const isModifiedClick = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0;

        if (isHashLink || isExternal || opensNewTab || isModifiedClick || link.hasAttribute("download")) {
            return;
        }

        e.preventDefault();
        document.body.classList.remove("fade-in");
        document.body.classList.add("fade-out");

        window.setTimeout(() => {
            window.location.href = destination;
        }, PAGE_FADE_MS);
    });
});

// ===== Nav Scroll Effect =====
const nav = document.querySelector(".nav");

if (nav) {
    window.addEventListener("scroll", () => {
        nav.classList.toggle("scrolled", window.scrollY > 50);
    });
}

// ===== GALLERY LIGHTBOX =====
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".lightbox-close");

if (lightbox && lightboxImg && closeBtn) {
    const galleryImages = document.querySelectorAll(".gallery-grid img");

    const closeLightbox = () => {
        lightbox.classList.remove("active");
        document.body.classList.remove("lightbox-open");
    };

    const openLightbox = (img) => {
        lightbox.classList.add("active");
        document.body.classList.add("lightbox-open");
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "Expanded gallery image";
    };

    galleryImages.forEach((img) => {
        img.tabIndex = 0;
        img.setAttribute("role", "button");
        img.setAttribute("aria-label", img.alt || "Open gallery image");

        img.addEventListener("click", () => openLightbox(img));
        img.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox(img);
            }
        });
    });

    closeBtn.addEventListener("click", closeLightbox);
    closeBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            closeLightbox();
        }
    });

    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && lightbox.classList.contains("active")) {
            closeLightbox();
        }
    });
}
