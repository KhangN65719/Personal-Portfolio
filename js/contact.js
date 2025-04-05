// Initialize EmailJS with your User ID
(function() {
    // Replace "YOUR_USER_ID" with your actual EmailJS User ID (Public Key)
    emailjs.init("lOhj5xzK-_GxpwXsW");
})();

// Handle the contact form submission
document.addEventListener('DOMContentLoaded', function() {
    // Get reference to the contact form
    const contactForm = document.getElementById('contact-form');
    
    // If the form exists on the page
    if (contactForm) {
        // Add submit event listener
        contactForm.addEventListener('submit', function(event) {
            // Prevent default form submission
            event.preventDefault();
            
            // Change button text and disable while sending
            const button = this.querySelector('button');
            const originalText = button.textContent;
            button.textContent = "Sending...";
            button.disabled = true;
            
            // Get the success and error message elements
            const successMessage = document.getElementById('success-message');
            const errorMessage = document.getElementById('error-message');
            
            // Hide any existing messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Create template parameters object with form values
            const templateParams = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Send the email using EmailJS
            // Replace "YOUR_SERVICE_ID" and "YOUR_TEMPLATE_ID" with your actual IDs
            emailjs.send("service_iipgs4m", "template_3ubed5i", templateParams)
                .then(function(response) {
                    // Success case
                    console.log("SUCCESS!", response.status, response.text);
                    
                    // Show success message
                    successMessage.style.display = 'block';
                    
                    // Reset the form
                    contactForm.reset();
                    
                    // Hide success message after 5 seconds
                    setTimeout(function() {
                        successMessage.style.display = 'none';
                    }, 5000);
                })
                .catch(function(error) {
                    // Error case
                    console.log("FAILED...", error);
                    
                    // Show error message
                    errorMessage.style.display = 'block';
                    
                    // Hide error message after 5 seconds
                    setTimeout(function() {
                        errorMessage.style.display = 'none';
                    }, 5000);
                })
                .finally(function() {
                    // Reset button regardless of success/failure
                    button.textContent = originalText;
                    button.disabled = false;
                });
        });
    }
});