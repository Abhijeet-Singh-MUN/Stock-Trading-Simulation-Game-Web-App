import Game from '../models/Game.mjs';
import Player from '../models/Player.mjs';
import cron from 'node-cron';


export const createGame = async (req, res) => {
  const { name, startingAmount, durationHours } = req.body;
  
  try {
    // Generate unique game ID
    const gameId = generateGameId();

    const game = new Game({
      gameId, // Assign the generated game ID
      name,
      startingAmount,
      durationHours,
      createdAt: new Date() // Store date and time of initialization
    });
    
    await game.save();
    
    // Schedule declaring winner after specified duration
    await scheduleDeclareWinner(gameId, durationHours);

    res.status(201).json(game);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const changeGameSettings = async (req, res) => {
  const { gameId, startingAmount, durationHours } = req.body;

  try {
    let game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Update game settings
    game.startingAmount = startingAmount;
    game.durationHours = durationHours;
    await game.save();

    res.status(200).json({ message: 'Game settings updated' });
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
  const gameId = req.body.gameId;

  try {
    // Find the game by gameId
    const game = await Game.findById(gameId).populate('players');

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    // Calculate the total value of each player's portfolio
    const playerValues = await Promise.all(
      game.players.map(async (player) => {
        // Calculate the total value of the player's portfolio
        const totalValue = player.currentAmount + calculatePortfolioValue(player.portfolio);
        return { playerId: player.playerId, totalValue };
      })
    );

    // Find the player with the highest total value
    const winner = playerValues.reduce((prev, current) => {
      return prev.totalValue > current.totalValue ? prev : current;
    }, {});

    // Find the player object of the winner
    const winningPlayer = game.players.find(
      (player) => player.playerId === winner.playerId
    );

    // Declare the winner
    res.status(200).json({
      winner: {
        playerId: winningPlayer.playerId,
        username: winningPlayer.username,
        totalValue: winner.totalValue,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Function to calculate the total value of a player's portfolio
const calculatePortfolioValue = (portfolio) => {
  return portfolio.reduce((total, stock) => {
    return total + (stock.quantity * stock.pricePerShare);
  }, 0);
};

// Function to schedule declaring winner after specified duration
export const scheduleDeclareWinner = async (gameId, durationHours) => {
  // Calculate seconds from duration hours
  const seconds = durationHours * 3600;

  // Schedule the declareWinner function to run after specified duration
  cron.schedule(`*/${seconds} * * * *`, async () => {
    await declareWinner(gameId);
  });
};