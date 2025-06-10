document.addEventListener('DOMContentLoaded', () => {
    // Inicializar partículas si el elemento existe
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

    // Funcionalidad de tarjetas expandibles
    document.querySelectorAll('.causa-card.expandible').forEach(card => {
        card.addEventListener('click', (event) => {
            // Evitar que se active si se hace clic en un enlace
            if (event.target.tagName === 'A' || event.target.closest('A')) return;

            const info = card.querySelector('.causa-info');
            if (!info) return;

            const isExpanded = info.style.maxHeight && info.style.maxHeight !== '0px';

            // Cerrar todas las demás tarjetas primero
            document.querySelectorAll('.causa-card.expandible').forEach(otherCard => {
                if (otherCard !== card) {
                    const otherInfo = otherCard.querySelector('.causa-info');
                    if (otherInfo) {
                        otherInfo.style.maxHeight = null;
                        otherInfo.style.opacity = '0';
                        otherInfo.style.marginTop = null;
                        otherInfo.style.paddingTop = null;
                        otherInfo.style.borderTopColor = 'transparent';
                    }
                }
            });

            // Alternar el estado de la tarjeta actual
            if (isExpanded) {
                // Cerrar
                info.style.maxHeight = null;
                info.style.opacity = '0';
                info.style.marginTop = null;
                info.style.paddingTop = null;
                info.style.borderTopColor = 'transparent';
            } else {
                // Abrir
                info.style.maxHeight = info.scrollHeight + 40 + "px";
                info.style.opacity = '1';
                info.style.marginTop = '20px';
                info.style.paddingTop = '20px';
                
                // Determinar el color del borde según el tipo de tarjeta
                const isConsequence = card.querySelector('.consecuencias-badge');
                const borderColor = isConsequence ? 'var(--rojo-oms)' : 'var(--azul-principal)';
                info.style.borderTop = `2px solid ${borderColor}`;
            }
        });
    });

    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calcular offset para header fijo si existe
                const headerOffset = document.querySelector('header')?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({ 
                    top: offsetPosition, 
                    behavior: 'smooth' 
                });

                // Cerrar todas las tarjetas expandidas al navegar
                document.querySelectorAll('.causa-info').forEach(info => {
                    info.style.maxHeight = null;
                    info.style.opacity = '0';
                    info.style.marginTop = null;
                    info.style.paddingTop = null;
                    info.style.borderTopColor = 'transparent';
                });
            }
        });
    });

    // Lazy loading para imágenes (si se implementa en el futuro)
    const lazyLoadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                });
            });
            images.forEach(img => imageObserver.observe(img));
        }
    };
    
    // Ejecutar lazy loading si hay imágenes con data-src
    lazyLoadImages();

    // Animaciones de entrada para elementos cuando entran en viewport
    const observeElements = () => {
        const elements = document.querySelectorAll('.causa-card, .region, .comparativa-global');
        
        if ('IntersectionObserver' in window) {
            const elementObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            elements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                elementObserver.observe(el);
            });
        }
    };

    // Ejecutar animaciones de entrada
    observeElements();

    // Mejorar la accesibilidad con navegación por teclado
    document.querySelectorAll('.causa-card.expandible').forEach(card => {
        // Hacer las tarjetas accesibles por teclado
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');
        card.setAttribute('aria-expanded', 'false');
        
        // Agregar descripción accesible
        const titulo = card.querySelector('.causa-titulo')?.textContent;
        if (titulo) {
            card.setAttribute('aria-label', `Expandir información sobre: ${titulo}`);
        }

        // Manejar navegación por teclado
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
                
                // Actualizar aria-expanded
                const info = card.querySelector('.causa-info');
                const isExpanded = info && info.style.maxHeight && info.style.maxHeight !== '0px';
                card.setAttribute('aria-expanded', isExpanded.toString());
            }
        });
    });

    console.log('Script global cargado correctamente');
});