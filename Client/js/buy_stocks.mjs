// buy_stocks.js

document.addEventListener('DOMContentLoaded', async () => {
    const buyStocksForm = document.getElementById('buy-stocks-form');
    const buyStocksMessage = document.getElementById('buy-stocks-message');

    buyStocksForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const stockSymbol = document.getElementById('stockSymbol').value;
        const quantity = document.getElementById('quantity').value;
        const pricePerShare = document.getElementById('pricePerShare').value;

        try {
            const response = await fetch('/api/trade/buy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ stockSymbol, quantity, pricePerShare })
            });
            const data = await response.json();
            // Handle success or display error message
            buyStocksMessage.textContent = data.message;
        } catch (error) {
            console.error('Error buying stocks:', error);
            buyStocksMessage.textContent = 'Error buying stocks. Please try again.';
        }
    });
});
