/**
 * Animation Manager
 * Handles scroll-based animations and transitions
 */
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
    }

    setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements with animation attributes
        document.querySelectorAll('[data-animation]').forEach(element => {
            observer.observe(element);
        });
    }

    setupHoverEffects() {
        const style = document.createElement('style');
        style.textContent = `
            .hover-lift {
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }

            .hover-lift:hover {
                transform: translateY(-4px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }

            .hover-scale {
                transition: transform 0.3s ease;
            }

            .hover-scale:hover {
                transform: scale(1.05);
            }

            .hover-bright {
                transition: filter 0.3s ease;
            }

            .hover-bright:hover {
                filter: brightness(1.1);
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes slideUp {
                from { 
                    opacity: 0;
                    transform: translateY(20px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes slideLeft {
                from { 
                    opacity: 0;
                    transform: translateX(-20px);
                }
                to { 
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            @keyframes slideRight {
                from { 
                    opacity: 0;
                    transform: translateX(20px);
                }
                to { 
                    opacity: 1;
                    transform: translateX(0);
                }
            }

            .animate-fade-in {
                animation: fadeIn 0.6s ease forwards;
            }

            .animate-slide-up {
                animation: slideUp 0.6s ease forwards;
            }

            .animate-slide-left {
                animation: slideLeft 0.6s ease forwards;
            }

            .animate-slide-right {
                animation: slideRight 0.6s ease forwards;
            }

            /* Stagger animations for grid items */
            .comparison-grid > *,
            .services-grid > *,
            .articles-grid > * {
                opacity: 0;
            }

            .comparison-grid > *[data-delay="0"] { animation-delay: 0s; }
            .comparison-grid > *[data-delay="1"] { animation-delay: 0.1s; }
            .comparison-grid > *[data-delay="2"] { animation-delay: 0.2s; }
            .comparison-grid > *[data-delay="3"] { animation-delay: 0.3s; }
        `;
        document.head.appendChild(style);

        // Add hover classes to interactive elements
        document.querySelectorAll('.card, .service-card, .article-card').forEach(card => {
            card.classList.add('hover-lift');
        });

        document.querySelectorAll('.card img, .service-card img, .article-card img').forEach(img => {
            img.classList.add('hover-scale');
        });

        document.querySelectorAll('.btn').forEach(btn => {
            btn.classList.add('hover-bright');
        });
    }

    animateElement(element) {
        const animation = element.dataset.animation;
        const delay = element.dataset.delay || '0';
        
        element.style.animationDelay = `${delay}s`;
        element.classList.add(`animate-${animation}`);
    }
}

// Initialize animation manager
window.animationManager = new AnimationManager();