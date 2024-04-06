// game_details.js

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('gameId');
    const showGameDetailsButton = document.getElementById('show-game-details');
    const gameDetailsContainer = document.getElementById('game-details');

    showGameDetailsButton.addEventListener('click', async () => {
        try {
            const response = await fetch(`/api/player/game-details/${gameId}`);
            const data = await response.json();
            // Handle data and display game details
            gameDetailsContainer.innerHTML = ''; // Clear previous content
            const gameDetailsList = document.createElement('ul');
            // Populate game details list
            data.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `${item.field}: ${item.value}`;
                gameDetailsList.appendChild(listItem);
            });
            gameDetailsContainer.appendChild(gameDetailsList);
            gameDetailsContainer.style.display = 'block'; // Show game details
        } catch (error) {
            console.error('Error fetching game details:', error);
        }
    });
});
