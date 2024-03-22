// gameRoutes.mjs
import express from 'express';
import { createGame, joinGame, leaveGame,  declareWinner, changeGameSettings  } from '../controllers/gameController.mjs';

const router = express.Router();

// Route for creating a new game
router.post('/create', createGame);

// Route for joining an existing game
router.post('/join', joinGame);

// Route for leaving a game
router.post('/leave', leaveGame);

// Route for declaring the winner
router.post('/declareWinner', declareWinner);

// Route for changing game settings
router.post('/changeSettings', changeGameSettings);

export default router;
