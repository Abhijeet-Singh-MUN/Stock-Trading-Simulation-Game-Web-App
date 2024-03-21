import Player from '../models/Player.mjs';
import jwt from 'jsonwebtoken';
import config from '../config.mjs';

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if username already exists
    let player = await Player.findOne({ username });

    if (player) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Generate unique player ID
    // i will share it to client only as an authentication token for later as added feature, used for joining game 
    const playerId = password + Math.floor(100000 + Math.random() * 900000); // Concatenate password with random 6-digit number

    player = new Player({
      playerId,
      username,
      password
    });

    await player.save();

    // Create JWT token
    const payload = {
      player: {
        id: playerId // Use the generated playerId as the player's id in the payload
      }
    };

    jwt.sign(
      payload,
      config.jwtSecret,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await Player.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      config.jwtSecret,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
};