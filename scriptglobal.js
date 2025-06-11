document.addEventListener('DOMContentLoaded', () => {
    // Configuración de partículas.js
    if(document.getElementById('particles-js')){
        particlesJS("particles-js", {
            "particles": { 
                "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, 
                "color": { "value": "#3B82F6" }, 
                "shape": { "type": "circle" }, 
                "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } }, 
                "size": { "value": 3, "random": true }, 
                "line_linked": { "enable": true, "distance": 150, "color": "#93C5FD", "opacity": 0.4, "width": 1 }, 
                "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" } 
            },
            "interactivity": { 
                "detect_on": "canvas", 
                "events": { 
                    "onhover": { "enable": true, "mode": "grab" }, 
                    "onclick": { "enable": true, "mode": "push" }, 
                    "resize": true 
                }, 
                "modes": { 
                    "grab": { "distance": 180, "line_linked": { "opacity": 1 } }, 
                    "push": { "particles_nb": 5 } 
                } 
            },
            "retina_detect": true
        });
    }

    // Función para expandir/contraer tarjetas
    function toggleCardExpansion(card) {
        const info = card.querySelector('.causa-info');
        if (!info) return;

        const isExpanded = info.style.maxHeight && info.style.maxHeight !== '0px';

        if (isExpanded) {
            info.style.maxHeight = '0';
            info.style.opacity = '0';
            info.style.marginTop = '0';
            info.style.paddingTop = '0';
            info.style.borderTopColor = 'transparent';
        } else {
            info.style.maxHeight = info.scrollHeight + 'px';
            info.style.opacity = '1';
            info.style.marginTop = '20px';
            info.style.paddingTop = '20px';
            info.style.borderTop = card.querySelector('.consecuencias-badge') ? 
                '2px solid var(--rojo-oms)' : '2px solid var(--azul-principal)';
        }
    }

    // Event listeners para las tarjetas expandibles
    document.querySelectorAll('.causa-card.expandible').forEach(card => {
        card.addEventListener('click', (event) => {
            // Evitar que se active al hacer clic en enlaces u otros elementos interactivos
            if (event.target.tagName === 'A' || event.target.closest('a')) {
                return;
            }
            toggleCardExpansion(card);
        });
    });

    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Inicializar todas las tarjetas como contraídas
    document.querySelectorAll('.causa-card.expandible .causa-info').forEach(info => {
        info.style.maxHeight = '0';
        info.style.opacity = '0';
        info.style.overflow = 'hidden';
        info.style.transition = 'all 0.5s ease';
    });
});
