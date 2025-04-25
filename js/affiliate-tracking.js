// Affiliate link tracking script
document.addEventListener('DOMContentLoaded', function() {
    // Track all affiliate link clicks
    const trackAffiliateLinks = () => {
        document.querySelectorAll('a[rel="sponsored"]').forEach(link => {
            link.addEventListener('click', function(e) {
                // Log click to console (for development purposes)
                console.log('Affiliate link clicked:', this.href);
                
                // In a real implementation, this would send data to Google Analytics
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'affiliate_click', {
                        'event_category': 'Outbound Links',
                        'event_label': this.href,
                        'transport_type': 'beacon'
                    });
                }
                
                // Add UTM parameters to links if they don't already have them
                if (!this.href.includes('utm_source=')) {
                    // Prevent modifying the href if it already has UTM parameters
                    const separator = this.href.includes('?') ? '&' : '?';
                    this.href = this.href + separator + 'utm_source=healthcompare&utm_medium=affiliate&utm_campaign=website';
                }
            });
        });
    };
    
    // Initialize affiliate link tracking
    trackAffiliateLinks();
    
    // Add affiliate disclosure to all pages with affiliate links
    const addAffiliateDisclosure = () => {
        if (document.querySelectorAll('a[rel="sponsored"]').length > 0) {
            const disclosure = document.createElement('div');
            disclosure.className = 'affiliate-disclosure-banner';
            disclosure.innerHTML = 'Ce site contient des liens affiliés. Nous pouvons toucher une commission si vous achetez via ces liens, sans coût supplémentaire pour vous.';
            disclosure.style.backgroundColor = '#f0f7ff';
            disclosure.style.padding = '10px 15px';
            disclosure.style.borderRadius = '5px';
            disclosure.style.margin = '15px 0';
            disclosure.style.fontSize = '0.9rem';
            disclosure.style.border = '1px solid #d0e3ff';
            
            // Add to top of content area
            const firstSection = document.querySelector('section');
            if (firstSection) {
                document.body.insertBefore(disclosure, firstSection);
            }
        }
    };
    
    // Initialize affiliate disclosure
    addAffiliateDisclosure();
    
    // Function to add Google Analytics tracking code
    const addGoogleAnalytics = () => {
        // This would normally be your Google Analytics tracking code
        // For demonstration purposes only
        console.log('Google Analytics tracking initialized');
        
        /*
        // Example Google Analytics implementation
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
        */
    };
    
    // Initialize Google Analytics
    addGoogleAnalytics();
});
