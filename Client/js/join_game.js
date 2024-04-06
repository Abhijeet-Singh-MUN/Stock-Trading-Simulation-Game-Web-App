// join_game.js

const joinGameForm = document.getElementById('join-game-form');
const joinGameMessage = document.getElementById('join-game-message');

joinGameForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const gameId = joinGameForm.elements['game-id'].value;
    const playerName = joinGameForm.elements['player-name'].value;

    try {
        const response = await fetch('/api/game/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gameId, playerName })
        });
        const data = await response.json();
        joinGameMessage.textContent = data.message;
        joinGameForm.reset();
    } catch (error) {
        joinGameMessage.textContent = error.message;
    }
});
