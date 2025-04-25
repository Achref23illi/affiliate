/**
 * Main JavaScript file for HealthCompare
 */
document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initScrollBehavior();
    setupLazyLoading();

    // Ensure default behavior for anchor tags with href
    const anchorTags = document.querySelectorAll('a[href]');
    anchorTags.forEach(anchor => {
        anchor.addEventListener('click', (event) => {
            const href = anchor.getAttribute('href');
            if (href && href !== '#') {
                window.location.href = href;
            }
        });
    });
});

function initMobileNav() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    
    if (!navToggle || !nav) return;

    navToggle.addEventListener('click', () => {
        const isExpanded = nav.classList.contains('active');
        toggleNav(!isExpanded);
    });

    function toggleNav(show) {
        nav.style.display = 'block';
        requestAnimationFrame(() => {
            nav.classList.toggle('active', show);
            navToggle.classList.toggle('active', show);
            navToggle.setAttribute('aria-expanded', show);
        });
    }

    // Close nav when clicking outside
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !navToggle.contains(e.target)) {
            toggleNav(false);
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            nav.style.display = 'block';
            nav.classList.remove('active');
            navToggle.classList.remove('active');
        } else if (!nav.classList.contains('active')) {
            nav.style.display = 'none';
        }
    });
}

function initScrollBehavior() {
    const header = document.querySelector('header');
    if (!header) return;

    let lastScroll = 0;
    const scrollThreshold = 50;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add/remove scrolled class for header styling
        header.classList.toggle('scrolled', currentScroll > 50);

        // Hide/show header based on scroll direction
        if (Math.abs(currentScroll - lastScroll) > scrollThreshold) {
            if (currentScroll > lastScroll && currentScroll > 100) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            lastScroll = currentScroll;
        }
    }, { passive: true });
}

function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}