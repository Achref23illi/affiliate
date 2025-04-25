// Main JavaScript file for HealthCompare website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const setupMobileNav = () => {
        const navToggle = document.createElement('div');
        navToggle.className = 'nav-toggle';
        navToggle.innerHTML = '<span></span><span></span><span></span>';
        
        const nav = document.querySelector('nav');
        const header = document.querySelector('header .container');
        
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.nav-toggle')) {
                header.insertBefore(navToggle, nav);
                nav.style.display = 'none';
            }
            
            navToggle.addEventListener('click', function() {
                if (nav.style.display === 'none') {
                    nav.style.display = 'block';
                    this.classList.add('active');
                } else {
                    nav.style.display = 'none';
                    this.classList.remove('active');
                }
            });
        } else {
            const existingToggle = document.querySelector('.nav-toggle');
            if (existingToggle) {
                existingToggle.remove();
            }
            nav.style.display = 'block';
        }
    };
    
    // Initialize mobile nav
    setupMobileNav();
    
    // Update on window resize
    window.addEventListener('resize', setupMobileNav);
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Track outbound affiliate link clicks for analytics
    const trackAffiliateClicks = () => {
        document.querySelectorAll('a[rel="sponsored"]').forEach(link => {
            link.addEventListener('click', function(e) {
                // This would normally send data to Google Analytics
                console.log('Affiliate link clicked:', this.href);
                
                // In a real implementation, you would use something like:
                /*
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'affiliate_click', {
                        'event_category': 'Outbound Links',
                        'event_label': this.href,
                        'transport_type': 'beacon'
                    });
                }
                */
            });
        });
    };
    
    // Initialize affiliate link tracking
    trackAffiliateClicks();
    
    // Add affiliate disclosure to all pages with affiliate links
    const addAffiliateDisclosure = () => {
        if (document.querySelectorAll('a[rel="sponsored"]').length > 0) {
            const disclosure = document.createElement('div');
            disclosure.className = 'affiliate-disclosure-banner';
            disclosure.innerHTML = 'Ce site contient des liens affiliés. Nous pouvons toucher une commission si vous achetez via ces liens, sans coût supplémentaire pour vous.';
            
            // Add to top of content area
            const firstSection = document.querySelector('section');
            if (firstSection) {
                document.body.insertBefore(disclosure, firstSection);
            }
        }
    };
    
    // Initialize affiliate disclosure
    addAffiliateDisclosure();
});
