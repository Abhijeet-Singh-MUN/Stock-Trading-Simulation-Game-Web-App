// login.js

const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = loginForm.elements['username'].value;
    const password = loginForm.elements['password'].value;
    
    try {
        // Call the login endpoint directly
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        // Assuming login response contains a token upon successful login
        const token = data.token;
        // Save the token to local storage or session storage
        localStorage.setItem('token', token);
        loginMessage.textContent = 'Login successful!';
        // Redirect to the main dashboard or another page
        window.location.href = '/dashboard.html'; // Change the URL as needed
    } catch (error) {
        loginMessage.textContent = error.message;
    }
});
