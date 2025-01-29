document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Clear previous errors
            clearErrors();
            
            // Validate username
            if (username.length < 3) {
                showError('username', 'Username must be at least 3 characters long');
                return;
            }
            
            // Validate email
            if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                return;
            }
            
            // Validate password
            if (password.length < 6) {
                showError('password', 'Password must be at least 6 characters long');
                return;
            }
            
            // Validate password confirmation
            if (password !== confirmPassword) {
                showError('confirmPassword', 'Passwords do not match');
                return;
            }
            
            // If validation passes, submit the form
            this.submit();
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Clear previous errors
            clearErrors();
            
            // Validate email
            if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                return;
            }
            
            // Validate password
            if (password.length < 6) {
                showError('password', 'Password must be at least 6 characters long');
                return;
            }
            
            // If validation passes, submit the form
            this.submit();
        });
    }
    
    // Password visibility toggle
    const toggleButtons = document.querySelectorAll('.toggle-password');
    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.querySelector('.eye-icon').classList.toggle('show');
        });
    });
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
    field.classList.add('error-input');
}

function clearErrors() {
    const errors = document.querySelectorAll('.error');
    const errorInputs = document.querySelectorAll('.error-input');
    errors.forEach(error => error.remove());
    errorInputs.forEach(input => input.classList.remove('error-input'));
}
