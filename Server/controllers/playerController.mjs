import Player from '../models/Player.mjs';

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
