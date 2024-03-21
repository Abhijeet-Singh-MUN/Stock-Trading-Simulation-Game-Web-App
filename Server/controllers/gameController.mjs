import Game from '../models/Game.mjs';
import Player from '../models/Player.mjs';

import Game from '../models/Game.mjs';

export const createGame = async (req, res) => {
  const { name, startingAmount } = req.body;
  
  try {
    // Generate unique game ID
    const gameId = generateGameId();

    const game = new Game({
      gameId, // Assign the generated game ID
      name,
      startingAmount,
      createdAt: new Date() // Store date and time of initialization
    });
    
    await game.save();
    
    res.status(201).json(game);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Function to generate unique game ID
const generateGameId = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = String(currentDate.getFullYear()).slice(-2); // Get last two digits of year
  const hour = String(currentDate.getHours()).padStart(2, '0');
  const minute = String(currentDate.getMinutes()).padStart(2, '0');
  const second = String(currentDate.getSeconds()).padStart(2, '0');

  const randomSixDigitNumber = Math.floor(100000 + Math.random() * 900000); // Generate random 6-digit number

  return day + month + year + hour + minute + second + randomSixDigitNumber;
};


export const joinGame = async (req, res) => {
  const { gameId, playerId } = req.body;
  
  try {
    let game = await Game.findById(gameId);
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    let player = await Player.findById(playerId);
    
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }
    
    // Add player to the game's players array
    game.players.push(playerId);
    await game.save();
    
    // Update player's game reference
    player.games.push(gameId);
    await player.save();
    
    res.status(200).json(game);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const leaveGame = async (req, res) => {
  const { gameId, playerId } = req.body;
  
  try {
    let game = await Game.findById(gameId);
    
    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }
    
    // Update player's game reference
    let player = await Player.findById(playerId);
    player.games = player.games.filter(g => g.toString() !== gameId);
    
    // Save player state before removing from game
    await player.save();
    
    // Remove player from the game's players array
    game.players = game.players.filter(p => p.toString() !== playerId);
    
    // Save game state after player has left
    await game.save();
    
    res.status(200).json({ message: 'Player left the game' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};


export const declareWinner = async (req, res) => {
  // Implement logic to declare winner
};
