document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.exp-tab-button');
    const tabContents = document.querySelectorAll('.exp-content');
    const tabSlider = document.querySelector('.exp-tab-slider');
    
    // Initial tab slider position
    updateTabSlider();
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('exp-active'));
            tabContents.forEach(content => content.classList.remove('exp-active'));
            
            // Add active class to clicked button
            this.classList.add('exp-active');
            
            // Show corresponding content
            const targetId = this.getAttribute('data-target');
            document.getElementById(targetId).classList.add('exp-active');
            
            // Update tab slider position
            updateTabSlider();
        });
    });
    
    // Update tab slider position based on active tab
    function updateTabSlider() {
        const activeTab = document.querySelector('.exp-tab-button.exp-active');
        if (activeTab && window.innerWidth > 768) {
            const tabPosition = activeTab.offsetLeft;
            const tabWidth = activeTab.offsetWidth;
            
            tabSlider.style.width = `${tabWidth}px`;
            tabSlider.style.left = `${tabPosition}px`;
        }
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            updateTabSlider();
        } else {
            tabSlider.style.width = '0';
        }
    });
});