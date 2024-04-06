// declare_winner.js

const declareWinnerForm = document.getElementById('declare-winner-form');
const declareWinnerMessage = document.getElementById('declare-winner-message');

declareWinnerForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const gameId = declareWinnerForm.elements['game-id'].value;

    try {
        const response = await fetch('/api/game/declareWinner', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ gameId })
        });
        const data = await response.json();
        declareWinnerMessage.textContent = data.message;
        declareWinnerForm.reset();
    } catch (error) {
        declareWinnerMessage.textContent = error.message;
    }
});
