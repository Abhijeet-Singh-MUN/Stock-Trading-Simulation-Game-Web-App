// gameRoutes.mjs
import express from 'express';
import { createGame, joinGame, leaveGame } from '../controllers/gameController.mjs';

const router = express.Router();

// Route for creating a new game
router.post('/create', createGame);

// Route for joining an existing game
router.post('/join', joinGame);

// Route for leaving a game
router.post('/leave', leaveGame);

export default router;
