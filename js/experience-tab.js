document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.exp-tab-button');
    const tabContents = document.querySelectorAll('.exp-content');
    const tabSlider = document.querySelector('.exp-tab-slider');
    
    // Set initial tab slider position
    if (tabSlider && tabButtons.length > 0) {
        const activeTab = document.querySelector('.exp-tab-button.exp-active');
        if (activeTab) {
            updateTabSlider(activeTab);
        }
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('exp-active'));
            tabContents.forEach(content => content.classList.remove('exp-active'));
            
            // Add active class to clicked button
            this.classList.add('exp-active');
            
            // Update tab slider position
            if (tabSlider) {
                updateTabSlider(this);
            }
            
            // Show corresponding content
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('exp-active');
        });
    });
    
    function updateTabSlider(activeTab) {
        // Only update slider if we're not in mobile view
        if (window.innerWidth > 768) {
            tabSlider.style.width = `${activeTab.offsetWidth}px`;
            tabSlider.style.left = `${activeTab.offsetLeft}px`;
        }
    }
    
    // Update tab slider on window resize
    window.addEventListener('resize', function() {
        const activeTab = document.querySelector('.exp-tab-button.exp-active');
        if (activeTab && tabSlider) {
            updateTabSlider(activeTab);
        }
    });
    
    // Add hover effect to list items
    const expItems = document.querySelectorAll('.exp-details li');
    expItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.color = '#ffffff';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.color = '#e6e6e6';
        });
    });
});