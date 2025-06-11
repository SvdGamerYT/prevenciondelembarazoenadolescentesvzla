document.addEventListener('DOMContentLoaded', function() {
    // Configuración de partículas interactivas
    if (document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#3B82F6"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#93C5FD",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 3,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 180,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // Funcionalidad para expandir tarjetas
    document.querySelectorAll('.causa-card.expandible').forEach(card => {
        card.addEventListener('click', function(event) {
            // Evitar que se active cuando se hace clic en un enlace
            if (event.target.tagName === 'A' || event.target.closest('A')) {
                return;
            }

            const info = this.querySelector('.causa-info');
            if (!info) return;

            const isExpanded = info.style.maxHeight && info.style.maxHeight !== '0px';

            if (isExpanded) {
                info.style.maxHeight = null;
                info.style.opacity = '0';
                info.style.marginTop = null;
                info.style.paddingTop = null;
                info.style.borderTopColor = 'transparent';
            } else {
                info.style.maxHeight = info.scrollHeight + 40 + "px";
                info.style.opacity = '1';
                info.style.marginTop = '20px';
                info.style.paddingTop = '20px';
                info.style.borderTop = '2px solid' + (this.querySelector('.consecuencias-badge') ? 'var(--rojo-oms)' : 'var(--azul-principal)');
            }
        });
    });

    // Scroll suave para enlaces internos
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
});
