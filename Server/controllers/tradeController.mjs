// tradeController.mjs
import axios from 'axios';
import Trade from '../models/Trade.mjs';
import Player from '../models/Player.mjs';

// Function to fetch stock price from Polygon API
const fetchStockPrice = async (symbol) => {
  try {
    const response = await axios.get(`https://api.polygon.io/v2/aggs/ticker/${symbol}/prev?unadjusted=true&apiKey=FhlPUOILlA0gTYNk_OGUCoSY6QTELurd`);
    const { results } = response.data;
    if (results && results.length > 0) {
      return results[0].c; // Return closing price of the stock
    }
    throw new Error('Unable to fetch stock price');
  } catch (error) {
    console.error('Error fetching stock price:', error.message);
    throw error;
  }
};

export const buyStock = async (req, res) => {
  const { playerId, symbol, quantity } = req.body;
  
  try {
    // Fetch stock price
    const pricePerShare = await fetchStockPrice(symbol);
    
    // Calculate total cost of buying stocks
    const totalCost = pricePerShare * quantity;
    
    // Find player by playerId
    const player = await Player.findOne({ playerId });

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Check if player has enough cash to buy stocks
    if (player.currentAmount < totalCost) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    // Deduct cash from player's currentAmount
    player.currentAmount -= totalCost;

    // Add stock to player's portfolio
    player.portfolio.push({ symbol, quantity, pricePerShare });

    // Save trade details
    const trade = new Trade({
      playerId,
      stockSymbol: symbol,
      quantity,
      pricePerShare,
      type: 'BUY'
    });

    await Promise.all([player.save(), trade.save()]);

    res.status(201).json({ message: 'Stock bought successfully', player });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const sellStock = async (req, res) => {
  const { playerId, symbol, quantity } = req.body;
  
  try {
    // Fetch stock price
    const pricePerShare = await fetchStockPrice(symbol);
    
    // Find player by playerId
    const player = await Player.findOne({ playerId });

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Check if player has the stock in portfolio
    const stockIndex = player.portfolio.findIndex(item => item.symbol === symbol);
    if (stockIndex === -1 || player.portfolio[stockIndex].quantity < quantity) {
      return res.status(400).json({ message: 'Insufficient stocks' });
    }

    // Add cash to player's currentAmount
    const totalValue = pricePerShare * quantity;
    player.currentAmount += totalValue;

    // Update player's portfolio
    player.portfolio[stockIndex].quantity -= quantity;

    if (player.portfolio[stockIndex].quantity === 0) {
      player.portfolio.splice(stockIndex, 1); // Remove stock from portfolio if quantity becomes zero
    }

    // Save trade details
    const trade = new Trade({
      playerId,
      stockSymbol: symbol,
      quantity,
      pricePerShare,
      type: 'SELL'
    });

    await Promise.all([player.save(), trade.save()]);

    res.status(201).json({ message: 'Stock sold successfully', player });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};
