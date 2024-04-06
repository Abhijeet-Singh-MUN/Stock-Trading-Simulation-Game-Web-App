// change_settings.js

const changeSettingsForm = document.getElementById('change-settings-form');
const changeSettingsMessage = document.getElementById('change-settings-message');

changeSettingsForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Add logic to get and serialize form data for changing game settings

    try {
        const response = await fetch('/api/game/changeSettings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(/* Form data */)
        });
        const data = await response.json();
        changeSettingsMessage.textContent = data.message;
        changeSettingsForm.reset();
    } catch (error) {
        changeSettingsMessage.textContent = error.message;
    }
});
