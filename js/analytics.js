// Google Analytics implementation
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

// Replace with your Google Analytics tracking ID
ga('create', 'UA-XXXXXXXX-X', 'auto');
ga('send', 'pageview');

// Track outbound affiliate link clicks
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners to all affiliate links
    var affiliateLinks = document.querySelectorAll('a[rel="sponsored"]');
    
    for (var i = 0; i < affiliateLinks.length; i++) {
        affiliateLinks[i].addEventListener('click', function(e) {
            var url = this.href;
            var label = this.innerText || 'Affiliate Link';
            
            // Send event to Google Analytics
            ga('send', 'event', {
                eventCategory: 'Outbound Links',
                eventAction: 'click',
                eventLabel: label + ' - ' + url,
                transport: 'beacon'
            });
            
            // Log for debugging
            console.log('Affiliate link clicked: ' + url);
        });
    }
});
