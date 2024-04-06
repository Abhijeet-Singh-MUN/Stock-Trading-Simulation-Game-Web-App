// recent_games.js

document.addEventListener('DOMContentLoaded', async () => {
    const recentGamesList = document.getElementById('recent-games-list');

    try {
        const response = await fetch('/api/player/recent-games');
        const data = await response.json();
        // Handle data and populate recent games list
    } catch (error) {
        console.error('Error fetching recent games:', error);
    }
});
