// create_game.js

const createGameForm = document.getElementById('create-game-form');
const createGameMessage = document.getElementById('create-game-message');

createGameForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const gameName = createGameForm.elements['game-name'].value;
    const playerName = createGameForm.elements['player-name'].value;

    try {
        const response = await fetch('/api/game/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gameName, playerName })
        });
        const data = await response.json();
        createGameMessage.textContent = data.message;
        createGameForm.reset();
    } catch (error) {
        createGameMessage.textContent = error.message;
    }
});
