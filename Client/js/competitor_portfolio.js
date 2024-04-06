// competitor_portfolio.js

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get('playerId');

    const competitorPortfolioContainer = document.getElementById('competitor-portfolio');

    try {
        const response = await fetch(`/api/player/competitor-portfolio/${playerId}`);
        const data = await response.json();
        // Handle data and display competitor portfolio
    } catch (error) {
        console.error('Error fetching competitor portfolio:', error);
    }
});
