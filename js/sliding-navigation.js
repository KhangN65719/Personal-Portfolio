// This should be saved as js/sliding-navigation.js

document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.portfolio-section li a');
    
    // Create a sliding indicator element
    const navIndicator = document.createElement('div');
    navIndicator.className = 'nav-indicator';
    document.querySelector('.portfolio-section').appendChild(navIndicator);
    
    // Get all sections for scroll detection
    const sections = document.querySelectorAll('section, #Home');
    
    // Function to update active navigation based on scroll position
    function updateActiveNav() {
        // Get current scroll position
        const scrollPosition = window.scrollY;
        
        // Determine which section is currently in view
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 80;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = '#' + section.id;
            }
        });
        
        // Handle the Home section specifically (since it doesn't use 'section' tag)
        const homeSection = document.getElementById('Home');
        const homeTop = homeSection.offsetTop;
        const homeHeight = homeSection.offsetHeight;
        
        if (scrollPosition >= homeTop && scrollPosition < homeTop + homeHeight) {
            currentSection = '#Home';
        }
        
        // Update active state and slider position
        if (currentSection) {
            // Remove active class from all links
            navLinks.forEach(link => {
                link.classList.remove('active');
                link.parentElement.classList.remove('active');
            });
            
            // Add active class to current link
            const activeLink = document.querySelector(`.portfolio-section li a[href="${currentSection}"]`);
            
            if (activeLink) {
                activeLink.classList.add('active');
                activeLink.parentElement.classList.add('active');
                
                // Position the indicator under the active link
                navIndicator.style.width = `${activeLink.offsetWidth}px`;
                navIndicator.style.left = `${activeLink.offsetLeft}px`;
                navIndicator.style.opacity = '1';
            }
        }
    }
    
    // Initial call to set navigation on page load
    updateActiveNav();
    
    // Update on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Update on window resize (for responsive designs)
    window.addEventListener('resize', updateActiveNav);
    
    // Handle navigation click events
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Update indicator position immediately on click
            navLinks.forEach(l => {
                l.classList.remove('active');
                l.parentElement.classList.remove('active');
            });
            
            this.classList.add('active');
            this.parentElement.classList.add('active');
            
            navIndicator.style.width = `${this.offsetWidth}px`;
            navIndicator.style.left = `${this.offsetLeft}px`;
        });
    });
});