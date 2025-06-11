document.addEventListener('DOMContentLoaded', () => {

    // Inicialización de Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            particles: {
                number: { value: 50, density: { enable: true, value_area: 800 } },
                color: { value: "#3B82F6" },
                shape: { type: "circle" },
                opacity: { value: 0.4, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#2563EB", opacity: 0.2, width: 1 },
                move: { enable: true, speed: 2, direction: "none", out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" } },
                modes: { grab: { distance: 140, line_linked: { opacity: 0.5 } }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }

    // Funcionalidad para las tarjetas expandibles
    const expandibleCards = document.querySelectorAll('.expandible');
    expandibleCards.forEach(card => {
        card.addEventListener('click', () => {
            // Si la tarjeta ya está abierta, la cierra. Si no, la abre y cierra las demás.
            if (card.classList.contains('open')) {
                card.classList.remove('open');
            } else {
                expandibleCards.forEach(otherCard => {
                    otherCard.classList.remove('open');
                });
                card.classList.add('open');
            }
        });
    });

});
