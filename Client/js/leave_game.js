// leave_game.js

const leaveGameForm = document.getElementById('leave-game-form');
const leaveGameMessage = document.getElementById('leave-game-message');

leaveGameForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const gameId = leaveGameForm.elements['game-id'].value;

    try {
        const response = await fetch('/api/game/leave', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gameId })
        });
        const data = await response.json();
        leaveGameMessage.textContent = data.message;
        leaveGameForm.reset();
    } catch (error) {
        leaveGameMessage.textContent = error.message;
    }
});
