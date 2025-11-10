document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".signals");
    if (!logo) return;

    const originalSrc = logo.src;
    const altSrc = "images/signals-glitch.png";

    function glitchBurst(times = 6) {
        if (times <= 0) {
            const pause = 1000 + Math.random() * 3000;
            setTimeout(() => glitchBurst(6), pause);
            return;
        }

        const rect = logo.getBoundingClientRect();
        const x = (Math.random() - 0.5) * rect.width * 0.1;
        const y = (Math.random() - 0.5) * rect.height * 0.05; // small vertical shake
        const hue = Math.random() < 0.3 ? 45 : 0;
        const contrast = 100 + Math.random() * 200;
        const blur = Math.random() < 0.4 ? Math.random() * 3 : 0;

        logo.style.transform = `translate(${x}px, ${y}px)`;
        logo.style.filter = `hue-rotate(${hue}deg) contrast(${contrast}%) blur(${blur}px)`;

        if (Math.random() < 0.5) logo.src = altSrc;

        setTimeout(() => {
            logo.style.transform = "translate(0, 0)";
            logo.style.filter = "none";
            logo.src = originalSrc;

            setTimeout(() => glitchBurst(times - 1), 30 + Math.random() * 100);
        }, 30 + Math.random() * 50);
    }

    setTimeout(() => glitchBurst(3), 100);
});

