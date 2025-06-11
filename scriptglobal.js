document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('particles-js')){
        particlesJS("particles-js", {
            "particles": { 
                "number": { 
                    "value": 60, 
                    "density": { 
                        "enable": true, 
                        "value_area": 800 
                    } 
                }, 
                "color": { 
                    "value": "#3B82F6" 
                }, 
                "shape": { 
                    "type": "circle" 
                }, 
                "opacity": { 
                    "value": 0.5, 
                    "random": true, 
                    "anim": { 
                        "enable": true, 
                        "speed": 1, 
                        "opacity_min": 0.1, 
                        "sync": false 
                    } 
                }, 
                "size": { 
                    "value": 3, 
                    "random": true 
                }, 
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#93C5FD", 
                    "opacity": 0.4, 
                    "width": 1 
                }, 
                "move": { 
                    "enable": true, 
                    "speed": 2, 
                    "direction": "none", 
                    "out_mode": "out" 
                } 
            },
            "interactivity": { 
                "detect_on": "canvas", 
                "events": { 
                    "onhover": { 
                        "enable": true, 
                        "mode": "grab" 
                    }, 
                    "onclick": { 
                        "enable": true, 
                        "mode": "push" 
                    }, 
                    "resize": true 
                }, 
                "modes": { 
                    "grab": { 
                        "distance": 180, 
                        "line_linked": { 
                            "opacity": 1 
                        } 
                    }, 
                    "push": { 
                        "particles_nb": 5 
                    } 
                } 
            },
            "retina_detect": true
        });
    }

    document.querySelectorAll('.causa-card.expandible').forEach(card => {
        card.addEventListener('click', (event) => {
            if (event.target.tagName === 'A' || event.target.closest('A')) return;

            const info = card.querySelector('.causa-info');
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
                info.style.borderTop = '2px solid' + (card.querySelector('.consecuencias-badge') ? 'var(--rojo-oms)' : 'var(--azul-principal)');
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({ top: targetElement.offsetTop, behavior: 'smooth' });
            }
        });
    });
});
