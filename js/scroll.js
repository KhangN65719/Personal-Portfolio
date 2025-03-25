function smoothScroll(target, duration) {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}

// Device-specific scrolling
document.querySelectorAll('.portfolio-section a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        // Detect operating system
        if (navigator.platform.toLowerCase().includes('mac')) {
            // Specific duration for Mac
            smoothScroll(target, 3000);
        } else if (navigator.platform.toLowerCase().includes('win')) {
            // Specific duration for Windows
            smoothScroll(target, 100);
        } else {
            // Default for other systems
            smoothScroll(target, 700);
        }
    });
});

// Alternatively, detect browser
function detectBrowser() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('chrome')) {
        return 'chrome';
    } else if (userAgent.includes('firefox')) {
        return 'firefox';
    } else if (userAgent.includes('safari')) {
        return 'safari';
    }
    return 'unknown';
}