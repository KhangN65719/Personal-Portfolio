// Initialize EmailJS when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your Public Key
    emailjs.init("lOhj5xzK-_GxpwXsW");
    
    // Get reference to the contact form
    const contactForm = document.getElementById('contact-form');
    
    // Check if the form exists on the page
    if (!contactForm) return;
    
    // Form elements cache
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitButton = contactForm.querySelector('button');
    const successMessage = document.getElementById('success-message');
    const errorMessage = document.getElementById('error-message');
    
    // Add submit event listener
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Form submission handler
    function handleFormSubmit(event) {
        // Prevent default form submission
        event.preventDefault();
        
        // Basic validation
        if (!validateForm()) return;
        
        // Update UI for sending state
        setLoadingState(true);
        hideMessages();
        
        // Create template parameters object with form values
        const templateParams = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };
        
        // Send the email using EmailJS
        emailjs.send("service_iipgs4m", "template_3ubed5i", templateParams)
            .then(handleSuccess)
            .catch(handleError)
            .finally(() => setLoadingState(false));
    }
    
    // Form validation
    function validateForm() {
        let isValid = true;
        
        // You could add more sophisticated validation here
        if (!nameInput.value.trim()) {
            showError("Please enter your name");
            nameInput.focus();
            isValid = false;
        } else if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
            showError("Please enter a valid email address");
            emailInput.focus();
            isValid = false;
        } else if (!messageInput.value.trim()) {
            showError("Please enter a message");
            messageInput.focus();
            isValid = false;
        }
        
        return isValid;
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Success handler
    function handleSuccess(response) {
        console.log("SUCCESS!", response.status, response.text);
        contactForm.reset();
        // Success handling complete without showing any message
    }
    
    // And remove or comment out the showSuccess function
    function showSuccess(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
    }
    
    // Error handler
    function handleError(error) {
        console.error("FAILED...", error);
        showError("Failed to send the message. Please try again later.");
        
        // Hide error message after 5 seconds
        setTimeout(hideMessages, 5000);
    }
    
    // UI helpers
    function setLoadingState(isLoading) {
        const originalText = submitButton.dataset.originalText || submitButton.textContent;
        
        if (isLoading) {
            // Save original button text if not already saved
            if (!submitButton.dataset.originalText) {
                submitButton.dataset.originalText = originalText;
            }
            submitButton.textContent = "Sending...";
            submitButton.disabled = true;
        } else {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }
    
    function showSuccess(message) {
        successMessage.textContent = message;
        successMessage.style.display = 'block';
    }
    
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }
    
    function hideMessages() {
        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';
    }
});