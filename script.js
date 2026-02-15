// Fade IN on load
window.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add("fade-in");
});

// Fade OUT on link click
document.querySelectorAll(".enter-link").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const destination = this.getAttribute("href");

    document.body.classList.remove("fade-in");
    document.body.classList.add("fade-out");

    setTimeout(() => {
      window.location.href = destination;
    }, 600);
  });
});

// Nav scroll effect
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
