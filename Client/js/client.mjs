// client.js

document.addEventListener('DOMContentLoaded', () => {
    const createGameForm = document.getElementById('create-game-form');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const buyStockForm = document.getElementById('buy-stock-form');
    const sellStockForm = document.getElementById('sell-stock-form');
    const changeSettingsForm = document.getElementById('change-settings-form');

    // Event listener for creating a new game
    createGameForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            // Make request to server to create a new game
            const response = await fetch('/api/game/create', {
                method: 'POST',
                // Add any necessary headers and body data
            });
            // Handle response accordingly
        } catch (error) {
            console.error('Error creating game:', error);
        }
    });

    // Event listener for user login
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            // Make request to server to login user
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                // Add any necessary headers and body data
            });
            // Handle response accordingly
        } catch (error) {
            console.error('Error logging in:', error);
        }
    });

    // Event listener for user registration
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            // Make request to server to register user
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                // Add any necessary headers and body data
            });
            // Handle response accordingly
        } catch (error) {
            console.error('Error registering user:', error);
        }
    });

    // Event listener for buying stocks
    buyStockForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            // Make request to server to buy stocks
            const response = await fetch('/api/trade/buy', {
                method: 'POST',
                // Add any necessary headers and body data
            });
            // Handle response accordingly
        } catch (error) {
            console.error('Error buying stocks:', error);
        }
    });

    // Event listener for selling stocks
    sellStockForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            // Make request to server to sell stocks
            const response = await fetch('/api/trade/sell', {
                method: 'POST',
                // Add any necessary headers and body data
            });
            // Handle response accordingly
        } catch (error) {
            console.error('Error selling stocks:', error);
        }
    });

    // Event listener for changing settings
    changeSettingsForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        try {
            // Make request to server to change settings
            const response = await fetch('/api/game/changeSettings', {
                method: 'POST',
                // Add any necessary headers and body data
            });
            // Handle response accordingly
        } catch (error) {
            console.error('Error changing settings:', error);
        }
    });
});
