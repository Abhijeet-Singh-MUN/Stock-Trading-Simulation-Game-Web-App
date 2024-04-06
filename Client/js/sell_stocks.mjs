// sell_stocks.js

document.addEventListener('DOMContentLoaded', async () => {
    const sellStocksForm = document.getElementById('sell-stocks-form');
    const sellStocksMessage = document.getElementById('sell-stocks-message');

    sellStocksForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        
        const stockSymbol = document.getElementById('stockSymbol').value;
        const quantity = document.getElementById('quantity').value;
        const pricePerShare = document.getElementById('pricePerShare').value;

        try {
            const response = await fetch('/api/trade/sell', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ stockSymbol, quantity, pricePerShare })
            });
            const data = await response.json();
            // Handle success or display error message
            sellStocksMessage.textContent = data.message;
        } catch (error) {
            console.error('Error selling stocks:', error);
            sellStocksMessage.textContent = 'Error selling stocks. Please try again.';
        }
    });
});
