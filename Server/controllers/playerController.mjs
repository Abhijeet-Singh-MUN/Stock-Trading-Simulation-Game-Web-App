import Player from '../models/Player.mjs';
import Game from '../models/Game.mjs';


export const getRecentGames = async (req, res) => {
  try {
    const playerId = req.body.playerId; // Assuming player ID is sent in the request body
    const player = await Player.findById(playerId).populate('recentGames.gameId');
    
    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    res.status(200).json(player.recentGames);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const getGameDetails = async (req, res) => {
  const gameId = req.params.gameId;
  
  try {
    const game = await Game.findById(gameId).populate('players').populate('recentGames.playerId');

    if (!game) {
      return res.status(404).json({ message: 'Game not found' });
    }

    res.status(200).json(game);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const getPlayerCompetitorPortfolio = async (req, res) => {
  const playerId = req.params.playerId;

  try {
    const player = await Player.findById(playerId);

    if (!player) {
      return res.status(404).json({ message: 'Player not found' });
    }

    // Extract competitor IDs from recent games
    const competitorIds = player.recentGames.map(game => game.playerId);

    // Fetch competitor portfolios
    const competitorPortfolios = await Promise.all(competitorIds.map(async id => {
      const competitor = await Player.findById(id);
      return {
        playerId: competitor.playerId,
        username: competitor.username,
        portfolio: competitor.portfolio
      };
    }));

    res.status(200).json(competitorPortfolios);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const createPlayer = async (req, res) => {
  const { username, password, startingAmount } = req.body;

  try {
    // Retrieve playerId from the database based on the user's authentication token??? yet to be implemented, persoanl ick
    // For demonstration purposes, let's assume there's a function to retrieve playerId by username
    const playerId = await getPlayerIdByUsername(username);

    if (!playerId) {
      return res.status(400).json({ message: 'Player not found' });
    }

    const player = new Player({
      playerId,
      username,
      password,
      startingAmount,
      currentAmount: startingAmount
    });

    await player.save();

    res.status(201).json(player);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

// Function to retrieve playerId by username from the database
const getPlayerIdByUsername = async (username) => {
  try {
    const player = await Player.findOne({ username });
    return player ? player.playerId : null;
  } catch (error) {
    console.error('Error retrieving playerId:', error.message);
    return null;
  }
};
