// registration.js

const registrationForm = document.getElementById('registration-form');
const registrationMessage = document.getElementById('registration-message');

registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const username = registrationForm.elements['username'].value;
    const password = registrationForm.elements['password'].value;
    
    try {
        // Call the register endpoint directly
        await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        registrationMessage.textContent = 'Registration successful!';
        registrationForm.reset();
    } catch (error) {
        registrationMessage.textContent = error.message;
    }
});
