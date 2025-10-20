document.addEventListener("DOMContentLoaded", () => {
    const logo = document.querySelector(".signals img");
    if (!logo) return;

    const originalSrc = logo.src;
    const altSrc = "images/signals-glitch.png"; // replace with your alternate image

    function glitchBurst(times = 6) {
        if (times <= 0) {
            // pause before next burst
            const pause = 1000 + Math.random() * 3000; // 1–4s pause
            setTimeout(() => glitchBurst(6), pause);
            return;
        }

        // get logo size for proportional movement
        const rect = logo.getBoundingClientRect();
        const x = (Math.random() - 0.5) * rect.width * 0.1;
        const y = (Math.random() - 0.5) * rect.height * 0;
        const rotate = (Math.random() - 0.5) * 0; // small rotation

        // 🎛️ random visual distortion
        const hue = Math.random() < 0.3 ? 45 : 0; // sometimes hue shift
        const contrast = 100 + Math.random() * 200; // 100–300%
        const blur = Math.random() < 0.4 ? Math.random() * 30 : 0; // sometimes blur (0–3px)

        logo.style.transform = `translate(${x}px, ${y}px) rotate(${rotate}deg)`;
        logo.style.filter = `hue-rotate(${hue}deg) contrast(${contrast}%) blur(${blur}px)`;

        // switch image randomly mid-burst
        if (Math.random() < 0.5) logo.src = altSrc;

        setTimeout(
            () => {
                // reset to normal
                logo.style.transform = "translate(0, 0) rotate(0deg)";
                logo.style.filter = "none";
                logo.src = originalSrc;

                // next micro-glitch in burst
                setTimeout(() => glitchBurst(times - 1), 30 + Math.random() * 100);
            },
            30 + Math.random() * 50
        );
    }

    // start the first burst after a brief delay
    setTimeout(() => glitchBurst(3), 100);
});
